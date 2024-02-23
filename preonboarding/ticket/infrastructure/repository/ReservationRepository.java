package com.wanted.preonboarding.ticket.infrastructure.repository;

import com.wanted.preonboarding.ticket.domain.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query(value = "select exists (select 1 from reservation where user_id = :userid and seat_info_id = :seatinfoid and status = 'reserved')", nativeQuery = true)
    Optional<Integer> findByUserIdAndSeatInfoId(@Param("userid") UUID userId, @Param("seatinfoid") int seatInfoId);
}
