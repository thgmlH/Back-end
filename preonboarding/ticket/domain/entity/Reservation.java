package com.wanted.preonboarding.ticket.domain.entity;

import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, name = "seat_info_id")
    private int seatInfoId;
    @Column(columnDefinition = "BINARY(16)", nullable = false, name = "user_id")
    private UUID userId;
    @Column(nullable = false)
    @ColumnDefault("reserved")
    private String status; // 예약; 취소;
    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(nullable = true)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public static Reservation of(ReserveInfo entity) {
        return Reservation.builder()
                .seatInfoId(entity.getSeatInfoId())
                .userId(entity.getUserId())
                .status(entity.getStatus())
                .build();
    }

}
