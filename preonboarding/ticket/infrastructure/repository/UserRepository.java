package com.wanted.preonboarding.ticket.infrastructure.repository;

import com.wanted.preonboarding.ticket.domain.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository

public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(UUID Id);

    @Modifying
    @Transactional
    @Query(value = "update user set balance = :balance where id = :id", nativeQuery = true)
    void updateBalanceById(@Param("balance")int balance, @Param("id")UUID Id);

}
