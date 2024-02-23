package com.wanted.preonboarding.ticket.exception;

public class NotFoundReservation extends ApiException {

    public NotFoundReservation(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
