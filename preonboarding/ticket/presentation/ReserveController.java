package com.wanted.preonboarding.ticket.presentation;

import com.wanted.preonboarding.ticket.adapter.PerformanceAdapter;
import com.wanted.preonboarding.ticket.adapter.ReservationAdapter;
//import com.wanted.preonboarding.ticket.application.TicketSeller;
import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
import com.wanted.preonboarding.ticket.port.in.ReserveUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ReserveController {
//    private final TicketSeller ticketSeller;
    private final ReserveUseCase reserveUseCase;

    @PostMapping("/reserve")
    public boolean reservation(@RequestBody ReserveInfo reserveInfo) {
        //예약 시 호출되는 api

        return reserveUseCase.reserve(reserveInfo);
//        return ticketSeller.reserve(ReserveInfo.builder()
//                .seatInfoId(2)
//                .userId(UUID.fromString("226e7912-ba81-11ee-b95d-0242ac150002"))
//                .status("reserved")
//                .build()
//        );
    }

    @PostMapping("/cancel")
    public boolean cancelation(@RequestBody ReserveInfo reserveInfo) {
        //예약 취소 시 호출되는 api

        return reserveUseCase.cancel(reserveInfo);
//        return ticketSeller.cancel(ReserveInfo.builder()
//                .seatInfoId(2)
//                .userId(UUID.fromString("226e7912-ba81-11ee-b95d-0242ac150002"))
//                .status("cancelled")
//                .build()
//        );
    }
}
