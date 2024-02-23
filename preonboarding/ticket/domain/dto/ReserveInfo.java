//package com.wanted.preonboarding.ticket.domain.dto;
//
//import com.wanted.preonboarding.ticket.persistence.ReserveCommand;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.antlr.v4.runtime.misc.NotNull;
//
//import java.util.UUID;
//
//@Getter
//@Setter
//@Builder
////@NoArgsConstructor
//@AllArgsConstructor
//public class ReserveInfo extends ReserveCommand {
//    // 공연 및 전시 정보 + 예약자 정보
//    @NotNull
//    private final int seatInfoId;
//    @NotNull
//    private final UUID userId;
//    @NotNull
//    private final String status; // 예약; 취소;
//}
package com.wanted.preonboarding.ticket.domain.dto;

import com.wanted.preonboarding.ticket.domain.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReserveInfo {
    // 공연 및 전시 정보 + 예약자 정보
    private int seatInfoId;
    private UUID userId;
    private String status; // 예약; 취소;
}
