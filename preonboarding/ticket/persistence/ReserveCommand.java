package com.wanted.preonboarding.ticket.persistence;

import java.util.UUID;

public class ReserveCommand {
    @Min(value=1)
    private int seatInfoId;

    private UUID userId;

    private String status;


}

