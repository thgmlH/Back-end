package com.wanted.preonboarding.ticket.port.out;

import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;
import com.wanted.preonboarding.ticket.domain.entity.Reservation;

import java.util.Optional;
import java.util.UUID;

public interface ReservePort {

    void save(Reservation reservation);
    Optional<Integer> find(UUID userId, int seatInfoId);
}
