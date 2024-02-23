package com.wanted.preonboarding.ticket.exception;

public class NotReservableSeat extends ApiException {

    public NotReservableSeat(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
