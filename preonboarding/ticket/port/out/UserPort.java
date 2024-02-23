package com.wanted.preonboarding.ticket.port.out;

import com.wanted.preonboarding.ticket.domain.entity.User;

import java.util.UUID;

public interface UserPort {

    void updateBalance(int balance, UUID userId);
    User findById(UUID id);
}
