package com.wanted.preonboarding.core.domain.response;

import lombok.Builder;

@Builder
public record ErrorResponse(int statusCode, String message, Integer data) {
}