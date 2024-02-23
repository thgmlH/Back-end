package com.wanted.preonboarding.ticket.adapter;

import com.wanted.preonboarding.ticket.domain.entity.PerformanceSeatInfo;
import com.wanted.preonboarding.ticket.infrastructure.repository.PerformanceSeatInfoRepository;
import com.wanted.preonboarding.ticket.port.out.PerformanceSeatInfoPort;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PerformanceSeatInfoAdapter implements PerformanceSeatInfoPort {
    private final PerformanceSeatInfoRepository performanceSeatInfoRepository;

    @Override
    public Optional<PerformanceSeatInfo> find(int seatInfoId, boolean isReserve) {
        return performanceSeatInfoRepository.findByIdAndIsReserve(seatInfoId, isReserve);
    }

    @Override
    public void update(int id) {
        performanceSeatInfoRepository.updateIsReserveById(id);
    }

}
