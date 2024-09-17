package com.dao;

import java.util.List;

import com.entity.Ticket;

public interface TicketDao {
	
	public void AddTicket(Long bookerId,Ticket ticket);
	public List<Ticket> getTicketsByBookerId(Long bookerid);
	public Ticket getTicket(Long ticket_id);
	public void cancelTicket(Long ticket_id);
}
