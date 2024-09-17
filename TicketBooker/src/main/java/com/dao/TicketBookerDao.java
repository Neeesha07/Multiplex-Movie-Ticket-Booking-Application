package com.dao;

import java.util.List;

import com.entity.Ticket;
import com.entity.TicketBooker;

public interface TicketBookerDao {
	
	public void addBooker(TicketBooker booker);
	public TicketBooker getticketBooker(long booker_id);
	public void deleteBooker(long booker_id);
	public TicketBooker EditProfile(long id,TicketBooker ticketbookerDetails);
	public List<TicketBooker> getallticketBooker();
	
	
}
