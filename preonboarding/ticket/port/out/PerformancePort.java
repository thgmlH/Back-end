package com.wanted.preonboarding.ticket.port.out;

import com.wanted.preonboarding.ticket.domain.entity.Performance;
import org.springframework.stereotype.Component;

import java.util.List;

public interface PerformancePort {

    List<Performance> findList(Boolean isReserve);
    Performance find(String name);
}
