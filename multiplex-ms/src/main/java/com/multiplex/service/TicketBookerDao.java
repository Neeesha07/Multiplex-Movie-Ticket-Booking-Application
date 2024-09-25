package com.multiplex.service;

import java.util.List;

import com.multiplex.model.Ticket;
import com.multiplex.model.TicketRequest;

public interface TicketBookerDao {
	public Ticket createTicket(long booker_id, TicketRequest ticketrequest);

}
