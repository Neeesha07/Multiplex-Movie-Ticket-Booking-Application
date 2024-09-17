package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.TicketDao;
import com.entity.Ticket;
import com.entity.TicketBooker;
import com.repository.TicketBookerRepo;
import com.repository.TicketRepo;

import jakarta.transaction.Transactional;


@Service
public class TicketImpl implements TicketDao{
	
	@Autowired
	private TicketBookerRepo ticketbookerrepo;
	
	@Autowired
	private TicketRepo ticketRepo;

	@Override
	@Transactional
	public void AddTicket(Long bookerId,Ticket ticket) {
		// TODO Auto-generated method stub
		TicketBooker ticketbooker=ticketbookerrepo.getById(bookerId);
		if(ticketbooker!=null) {
			ticket.setTicketBooker(ticketbooker);
			ticketRepo.save(ticket);
			
			ticketbooker.getBookedTickets().add(ticket);
			ticketbookerrepo.save(ticketbooker);
		}
		
	}

	
	  @Override
	  @Transactional 
	  public List<Ticket> getTicketsByBookerId(Long bookerid)
	  { //TODO Auto-generated method stub 
		  return ticketRepo.findTicketByBookerId(bookerid);
	  }
	 
	@Override
	@Transactional
	public Ticket getTicket(Long ticket_id) {
		// TODO Auto-generated method stub
		
		return ticketRepo.findById(ticket_id).orElse(null);
	}

	@Override
	@Transactional
	public void cancelTicket(Long ticket_id) {
		// TODO Auto-generated method stub
		Ticket ticket=ticketRepo.findById(ticket_id).orElse(null);
		if(ticket!=null) {
			TicketBooker booker=ticket.getTicketBooker();
			if(booker!=null) {
				booker.getBookedTickets().remove(ticket);
				ticketbookerrepo.save(booker);
				ticketRepo.deleteById(ticket_id);
			}
			
		

		}
	}

	
	
}
