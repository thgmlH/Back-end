package com.wanted.preonboarding.ticket.exception;

import java.util.List;

public class NotEnoughBalance extends ApiException{

    public NotEnoughBalance(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
