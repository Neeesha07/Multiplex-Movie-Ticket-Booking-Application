package com.dao;

import java.util.List;

import com.entity.Ticket;
import com.entity.Discounts;
import com.entity.Payments;

public interface TicketDao {
	
	public Ticket addTicket(Long bookerId,Ticket ticket);
	public List<Ticket> getTicketsByBookerId(Long bookerid);
	public Ticket getTicket(Long ticket_id);
	public void cancelTicket(Long ticket_id);
	public void confirmTicket(Long ticketId,Payments payment);
	public void transactionFailed(Long ticketId);
}
