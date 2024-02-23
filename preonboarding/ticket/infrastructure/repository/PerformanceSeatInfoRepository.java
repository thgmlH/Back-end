package com.wanted.preonboarding.ticket.infrastructure.repository;


import com.wanted.preonboarding.ticket.domain.entity.PerformanceSeatInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerformanceSeatInfoRepository extends JpaRepository<PerformanceSeatInfo, Integer> {
    Optional<PerformanceSeatInfo> findByIdAndIsReserve(int Id, boolean isReserve);
    @Modifying
    @Transactional
    @Query(value = "update performance_seat_info set is_reserve = false where id = :id", nativeQuery = true)
    void updateIsReserveById(@Param("id") int Id);
}
