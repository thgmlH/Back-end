package com.wanted.preonboarding.ticket.exception;

import lombok.Getter;

@Getter
public abstract class ApiException extends RuntimeException {

    protected final Integer statusCode;
    protected final String message;

    protected final Integer data;

    protected ApiException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.statusCode = exceptionCode.getStatusCode();
        this.message = exceptionCode.getMessage();
        this.data = exceptionCode.getData();
    }
}
