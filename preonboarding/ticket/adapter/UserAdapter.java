package com.wanted.preonboarding.ticket.adapter;

import com.wanted.preonboarding.ticket.domain.entity.User;
import com.wanted.preonboarding.ticket.infrastructure.repository.UserRepository;
import com.wanted.preonboarding.ticket.port.out.UserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class UserAdapter implements UserPort {
    private final UserRepository userRepository;

    public void updateBalance(int balance, UUID id) {
        userRepository.updateBalanceById(balance, id);
    };

    public User findById(UUID id) {
        return userRepository.findById(id);
    }
}
