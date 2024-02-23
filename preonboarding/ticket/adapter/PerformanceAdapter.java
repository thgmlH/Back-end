package com.wanted.preonboarding.ticket.adapter;

import com.wanted.preonboarding.ticket.domain.entity.Performance;
import com.wanted.preonboarding.ticket.infrastructure.repository.PerformanceRepository;
import com.wanted.preonboarding.ticket.port.out.PerformancePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PerformanceAdapter implements PerformancePort {
    private final PerformanceRepository performanceRepository;

    @Override
    public List<Performance> findList(Boolean isReserve) {
        return performanceRepository.findByIsReserve(isReserve);
    }

    @Override
    public Performance find(String name) {
        return performanceRepository.findByName(name);
    }

}
