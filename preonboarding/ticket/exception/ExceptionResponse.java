package com.wanted.preonboarding.ticket.exception;

import jakarta.persistence.EntityNotFoundException;

import org.json.JSONException;
import org.springframework.http.HttpStatus;
import com.wanted.preonboarding.core.domain.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ExceptionResponse {
    @ExceptionHandler({ApiException.class})
    protected ResponseEntity<ErrorResponse> handleException(ApiException e) throws JSONException {


        return ResponseEntity.status(e.getStatusCode())
                .body(
                        ErrorResponse.builder()
                                .statusCode(e.getStatusCode())
                                .message(e.getMessage())
                                .data(e.getData())
                                .build()
                );
    }
}
