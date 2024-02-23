package com.wanted.preonboarding.ticket.adapter;

import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
import com.wanted.preonboarding.ticket.domain.entity.PerformanceSeatInfo;
import com.wanted.preonboarding.ticket.domain.entity.Reservation;
import com.wanted.preonboarding.ticket.exception.NotReservableSeat;
import com.wanted.preonboarding.ticket.infrastructure.repository.ReservationRepository;
import com.wanted.preonboarding.ticket.port.out.ReservePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

import static com.wanted.preonboarding.ticket.exception.ExceptionCode.SEAT_ALREADY_RESERVED;

@Repository
@RequiredArgsConstructor
public class ReservationAdapter implements ReservePort {
    private final ReservationRepository reservationRepository;

    @Override
    public void save(Reservation reserveInfo) {
        reservationRepository.save(reserveInfo);
    }
    @Override
    public Optional<Integer> find(UUID userId, int seatInfoId) {
        return reservationRepository.findByUserIdAndSeatInfoId(userId, seatInfoId);
    }
}
