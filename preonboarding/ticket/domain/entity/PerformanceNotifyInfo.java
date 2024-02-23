//package com.wanted.preonboarding.ticket.domain.entity;
//
//import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.util.UUID;
//
//@Entity
//@Table
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class PerformanceNotifyInfo {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//    @Column(columnDefinition = "BINARY(16)", nullable = false, name = "performance_id")
//    private UUID performanceId;
//
//    @Column(columnDefinition = "BINARY(16)", nullable = false, name = "user_id")
//    private UUID userId;
//
//    @Column(nullable = false, name = "is_notified", columnDefinition = "varchar default 'disable'")
//    private String isNotify;
//
//    public static PerformanceNotifyInfo of(PerformanceNotifyInfo info) {
//        return PerformanceNotifyInfo.builder()
//            .performanceId(info.getPerformanceId())
//            .userId(info.getUserId())
//            .isNotify(info.getIsNotify())
//            .build();
//    }
//
//}
