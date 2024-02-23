//package com.wanted.preonboarding.ticket.domain.dto;
//
//import jakarta.persistence.Column;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.util.UUID;
//
//@Getter
//@Setter
//@Builder
//public class PeformanceNotifyInfo {
//    // 공연 및 전시 - 예약자 취소 알림 수신 여부 정보
//    @Column(nullable = false)
//    private UUID performanceId;
//    @Column(nullable = false)
//    private UUID userId;
//    @Column(nullable = false)
//    private String isNotify; // 취소 알림 수신; 미수신;
//
//    public static PeformanceNotifyInfo of(PeformanceNotifyInfo info) {
//        return PeformanceNotifyInfo.builder()
//                .performanceId(info.getPerformanceId())
//                .userId(info.getUserId())
//                .isNotify(info.getIsNotify())
//                .build();
//    }
//}
