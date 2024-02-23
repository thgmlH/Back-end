package com.wanted.preonboarding.ticket.application;

import com.wanted.preonboarding.ticket.domain.dto.PerformanceInfo;
import com.wanted.preonboarding.ticket.domain.entity.Performance;
import com.wanted.preonboarding.ticket.port.in.PerformanceUseCase;
import com.wanted.preonboarding.ticket.port.out.PerformancePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PerformanceService implements PerformanceUseCase {
    private final PerformancePort performancePort;

    public List<PerformanceInfo> getList() {
        return performancePort.findList(true)
                .stream()
                .map(PerformanceInfo::of)
                .toList();
    }
    public Performance get(String name) {
        return performancePort.find(name);
    }
}