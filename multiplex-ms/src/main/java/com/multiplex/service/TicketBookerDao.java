package com.multiplex.service;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.multiplex.model.Ticket;
import com.multiplex.model.TicketRequest;


//@Repository
public interface TicketBookerDao {
	public Ticket createTicket(Long booker_id, TicketRequest ticketrequest);

}
