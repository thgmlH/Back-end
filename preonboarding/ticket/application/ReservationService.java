package com.wanted.preonboarding.ticket.application;

import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
import com.wanted.preonboarding.ticket.domain.entity.PerformanceSeatInfo;
import com.wanted.preonboarding.ticket.domain.entity.Reservation;
import com.wanted.preonboarding.ticket.exception.ExceptionCode;
import com.wanted.preonboarding.ticket.exception.NotEnoughBalance;
import com.wanted.preonboarding.ticket.exception.NotFoundPerformanceSeatInfo;
import com.wanted.preonboarding.ticket.exception.NotFoundReservation;
import com.wanted.preonboarding.ticket.exception.NotReservableSeat;
import com.wanted.preonboarding.ticket.port.out.PerformanceSeatInfoPort;
import com.wanted.preonboarding.ticket.port.out.ReservePort;
import com.wanted.preonboarding.ticket.port.in.ReserveUseCase;
import com.wanted.preonboarding.ticket.port.out.UserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.wanted.preonboarding.ticket.exception.ExceptionCode.NOT_FOUND_INFO;
import static com.wanted.preonboarding.ticket.exception.ExceptionCode.NOT_FOUND_RESERVATION;
import static com.wanted.preonboarding.ticket.exception.ExceptionCode.PAYMENT_FAILED_INSUFFICIENT_BALANCE;
import static com.wanted.preonboarding.ticket.exception.ExceptionCode.SEAT_ALREADY_RESERVED;
import static com.wanted.preonboarding.ticket.exception.ExceptionCode.SEAT_DISABLED;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservationService implements ReserveUseCase {
    private final ReservePort reservePort;
    private final UserPort userPort;
    private final PerformanceSeatInfoPort performanceSeatInfoPort;
    public boolean reserve(ReserveInfo reserveInfo) {
        PerformanceSeatInfo info = performanceSeatInfoPort.find(reserveInfo.getSeatInfoId(), true)
                .orElseThrow(() -> new NotReservableSeat(SEAT_ALREADY_RESERVED));

        log.info("reserving performance info => {}", info);
        Boolean enableReserve = info.getIsReserve();
        if (enableReserve) {
            // 1. 결제
            // 공연 티켓 값(좌석마다 가격 상이하기에 좌석정보 테이블에 가격이 있게 함)
            int price = info.getPrice();
            int balance = userPort.findById(reserveInfo.getUserId()).getBalance();
            // 1-1. 결제 시 잔고 부족할 경우 예매 진행하지 않음
            if (balance >= price) {
                userPort.updateBalance(balance - price, reserveInfo.getUserId());
                // 2. 예매 진행
                reservePort.save(Reservation.of(reserveInfo));
                performanceSeatInfoPort.update(reserveInfo.getSeatInfoId());
                return true;
            }
            else {
                ExceptionCode errorInfo = PAYMENT_FAILED_INSUFFICIENT_BALANCE;
                errorInfo.data = balance;
                throw new NotEnoughBalance(errorInfo);
            }
        } else {
            //예약 불가능한 좌석일 시 예외 처리
            throw new NotReservableSeat(SEAT_DISABLED);
        }
    }

    public boolean cancel(ReserveInfo reserveInfo) {
        Integer canCancel  = reservePort.find(
                reserveInfo.getUserId(),
                reserveInfo.getSeatInfoId()
        ).orElseThrow(() -> new NotFoundReservation(NOT_FOUND_RESERVATION));

        log.info("reservation info => {}, {}, {}", reserveInfo.getUserId(), reserveInfo.getSeatInfoId(), canCancel);

        if (canCancel.equals(1)) {
            // 1. 환불 진행
            PerformanceSeatInfo seatInfo = performanceSeatInfoPort.find(reserveInfo.getSeatInfoId(), false)
                    .orElseThrow(() -> new NotFoundReservation(NOT_FOUND_RESERVATION));

            int price = seatInfo.getPrice();
            int balance = userPort.findById(reserveInfo.getUserId()).getBalance();

            userPort.updateBalance(balance + price, reserveInfo.getUserId());
            // 2. 예매 취소
            reserveInfo.setStatus("cancelled"); // updateAt 시간 찍히는지 확인 필요
            reservePort.save(Reservation.of(reserveInfo));

            return true;
        } else {
            throw new NotFoundReservation(NOT_FOUND_RESERVATION);
        }
    }
}
