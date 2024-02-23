package com.wanted.preonboarding.ticket.port.out;

import com.wanted.preonboarding.ticket.domain.entity.PerformanceSeatInfo;

import java.util.Optional;

public interface PerformanceSeatInfoPort {

    Optional<PerformanceSeatInfo> find(int seatInfoId, boolean isReserve);
    void update(int id);
}
