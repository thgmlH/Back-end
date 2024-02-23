//package com.wanted.preonboarding.ticket.infrastructure.repository;
//
//import com.wanted.preonboarding.ticket.domain.entity.Performance;
//import com.wanted.preonboarding.ticket.domain.entity.PerformanceNotifyInfo;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.UUID;
//
//public interface PerformanceNotifyRepository extends JpaRepository<PerformanceNotifyInfo, UUID> {
//    List<PerformanceNotifyInfo> findByPerformanceId(UUID performanceId, String isNotify);
//}
