package com.wanted.preonboarding.ticket.port.in;

import com.wanted.preonboarding.ticket.domain.dto.ReserveInfo;

public interface ReserveUseCase {
    boolean reserve(ReserveInfo reserveInfo);

    boolean cancel(ReserveInfo reserveInfo);
}
