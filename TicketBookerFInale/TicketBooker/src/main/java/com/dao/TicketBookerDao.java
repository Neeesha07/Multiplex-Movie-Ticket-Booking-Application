package com.dao;

import java.util.List;

import com.entity.Ticket;
import com.entity.TicketBooker;
import com.model.Feedback;

public interface TicketBookerDao {
	
	public void addBooker(TicketBooker booker);
	public TicketBooker getticketBooker(Long booker_id);
	public void deleteBooker(Long booker_id);
	public TicketBooker EditProfile(Long id,TicketBooker ticketbookerDetails);
	public List<TicketBooker> getallticketBooker();
	public Feedback addFeedback(String title, String feedbackBody);
	public TicketBooker getTicketBookerIdbyForeignUserId(Long foreignUserId); 
	
	//kafka
	String getKafkaMessage();

	
}
