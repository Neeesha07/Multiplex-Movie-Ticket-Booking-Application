package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dao.TicketDao;
import com.entity.Payments;
import com.entity.Ticket;
import com.entity.TicketBooker;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.repository.PaymentsRepo;
import com.repository.TicketBookerRepo;
import com.repository.TicketRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


@Service
@Transactional
public class TicketImpl implements TicketDao{
	
	@Autowired
	private TicketBookerRepo ticketbookerrepo1;
	
	@Autowired
	private TicketRepo ticketRepo;
	
	@Autowired
	private PaymentsRepo paymentRepo;

	@Autowired
	@Qualifier("webclient")
	private WebClient.Builder builder;

	@Override
	@Transactional
	public Ticket addTicket(Long bookerId,Ticket ticket) {
		// TODO Auto-generated method stub
		TicketBooker ticketbooker=ticketbookerrepo1.getById(bookerId);
		if(ticketbooker!=null) {
			ticket.setTicketBooker(ticketbooker);
			ticket.setTicketstatus("NOT BOOKED");
			ticket.setDiscountedAmount(ticket.getTotalAmount());
			ticketRepo.save(ticket);
			ticketbooker.getBookedTickets().add(ticket);
			ticketbookerrepo1.save(ticketbooker);
		}
		return ticket;
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
		
		//need to call multiplex here 
		
	    Ticket ticket = ticketRepo.findById(ticket_id).orElse(null);
	    if (ticket != null) {
	    	
			ObjectMapper mapper = new ObjectMapper();
			String bookingURL="http://localhost:8081/multiplex-ms/cancelseats/"+ticket.getScreeningId();
			String status = builder.build()
					.post()
					.uri(bookingURL)
					.bodyValue(ticket.getConfirmedSeats())
					.retrieve()
					.bodyToMono(String.class)
					.block();
	        Payments payment = paymentRepo.findByTicketId(ticket_id);
	        
	        if (payment != null) {
	            payment.setPaymentStatus("REFUND_INITIATED");
	            paymentRepo.save(payment); // Save the updated payment status
	        }

	        TicketBooker booker = ticket.getTicketBooker();
	        if (booker != null) {
	            booker.getBookedTickets().remove(ticket);
	            ticketbookerrepo1.save(booker);
	        }
	        ticket.setTicketstatus("CANCELLED");
	        ticketRepo.deleteById(ticket_id);
	         // Delete the ticket
	    } else {
	        throw new EntityNotFoundException("Ticket not found for id: " + ticket_id);
	    }
	}


//*******************************************************
		   //FAILED AT TRANSACTION//
	@Override
	@Transactional
	public void transactionFailed(Long ticketId) {
		// TODO Auto-generated method stub
		   Ticket ticketObject = ticketRepo.findById(ticketId).orElse(null);
		 if (ticketObject != null) {        
		        TicketBooker booker = ticketObject.getTicketBooker();
		        if (booker != null) {
		            booker.getBookedTickets().remove(ticketObject);
		            ticketbookerrepo1.save(booker);
		        }

		        ticketObject.setTicketstatus("NOT BOOKED"); // Delete the ticket
		        ticketRepo.deleteById(ticketId);
		    } else {
		        throw new EntityNotFoundException("Ticket not found for id: " + ticketId);
		    }
		
	}

//*******************************************************
			   //BOOKING CONFIRMATION//
	@Override
	@Transactional
	public void confirmTicket(Long ticketId, Payments payment) {
		
		//NEED TO CALL MULTIPLEX HERE
		
		
		// TODO Auto-generated method stub
		Ticket ticketObject = ticketRepo.getById(ticketId);
		ObjectMapper mapper = new ObjectMapper();
		String bookingURL="http://localhost:8081/multiplex-ms/bookseats/"+ticketObject.getScreeningId();
		String status = builder.build()
				.post()
				.uri(bookingURL)
				.bodyValue(ticketObject.getConfirmedSeats())
				.retrieve()
				.bodyToMono(String.class)
				.block();
	    payment.setTransactionId((long) (Math.random() * 1_000_000_0000L));
	    payment.setPaymentStatus("TRANSACTION_SUCCESS");
		payment.setTicket(ticketObject);
		paymentRepo.save(payment);
		ticketObject.setTicketstatus("BOOKED");
		
	}


	
}