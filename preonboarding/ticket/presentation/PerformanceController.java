package com.wanted.preonboarding.ticket.presentation;

import com.wanted.preonboarding.core.domain.response.ResponseHandler;
//import com.wanted.preonboarding.ticket.application.TicketSeller;
import com.wanted.preonboarding.ticket.domain.dto.PerformanceInfo;
import com.wanted.preonboarding.ticket.port.in.PerformanceUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class PerformanceController {
//    private final TicketSeller ticketSeller;
    private final PerformanceUseCase performanceUseCase;

    @GetMapping("/performance")
    public ResponseEntity<ResponseHandler<List<PerformanceInfo>>> getAllPerformanceList() {
        System.out.print("Return all performance");
        return ResponseEntity
                .ok()
                .body(ResponseHandler.<List<PerformanceInfo>>builder()
                        .message("Success")
                        .statusCode(HttpStatus.OK)
                        .data(performanceUseCase.getList())
                        .build()
                );
    }

    //Table trigger를 통해 얻은 정보를(예약 취소된 좌석 정보) 받아
    //해당 공연 알림 수신하는 user id 리스트와 예약 가능한 좌석 정보 반환
//    @GetMapping("/all/notify")
//    public ResponseEntity<Object> getAllPerformanceNotifyInfoList(@RequestParam(value = "name") String name) {
//        System.out.println("getAllPerformanceNotifyInfoList");
//
//        PerformanceInfo performanceInfo = ticketSeller.getPerformanceInfoDetail(name);
//
//
////        //여기서 알림 보내는거 해야 될 듯
////        Object responseObject = {
////            performanceNotifyUserList: ticketSeller.getAllPerformanceNotifyInfoList(performanceInfo.id, 'enable'),
////                performanceInfo: performanceInfo
////        };
//        return ResponseEntity
//                .ok()
//                .body(responseObject);
//    }
}
