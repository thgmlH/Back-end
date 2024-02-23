package com.wanted.preonboarding.ticket.port.in;

import com.wanted.preonboarding.ticket.domain.dto.PerformanceInfo;
import com.wanted.preonboarding.ticket.domain.entity.Performance;

import java.util.List;

public interface PerformanceUseCase {
    List<PerformanceInfo> getList();
    Performance get(String name);
}
