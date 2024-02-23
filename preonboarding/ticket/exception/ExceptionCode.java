package com.wanted.preonboarding.ticket.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    SEAT_DISABLED(400, "예매할 수 없는 좌석입니다.", null),
    PERFORMANCE_DISABLED(400, "예매할 수 없는 공연입니다.", null),
    ARGUMENT_NOT_VALID(400, "요청 값이 올바르지 않습니다.", null),
    PAYMENT_FAILED_INSUFFICIENT_BALANCE(400, "잔액이 부족합니다.", null),

    NOT_FOUND_INFO(404, "해당 정보를 찾을 수 없습니다.", null),

    NOT_FOUND_RESERVATION(404, "예약 정보를 찾을 수 없습니다.", null),

    SEAT_ALREADY_RESERVED(409, "이미 예약된 좌석입니다.", null),

    FAIL_TO_SEND_EMAIL(500, "이메일 전송에 실패했습니다.", null);

    private final Integer statusCode;
    private final String message;

    public Integer data;

    ExceptionCode(Integer statusCode, String message, Integer data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

}