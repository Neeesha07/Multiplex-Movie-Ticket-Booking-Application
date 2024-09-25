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
			ticket.setTicketstatus("INITIATED");
			ticket.setDiscountedAmount(ticket.getTotalAmount());
//			String calculateUrl="http://localhost:8081/multiplex/totalMoney/"+ticket.getMultiplexId();
//			ticket.setTotalAmount(builder.build()
//				.post()
//				.uri(calculateUrl)
//				.bodyValue(ticket.getConfirmedSeats())
//				.retrieve()
//				.bodyToMono(Double.class)
//				.block());
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
	    	Ticket ticketObject = ticketRepo.getById(ticket_id);
			ObjectMapper mapper = new ObjectMapper();
			String bookingURL="http://localhost:8081/multiplex/cancelseats/"+ticketObject.getScreeningId();
			String status = builder.build()
					.post()
					.uri(bookingURL)
					.bodyValue(ticketObject.getConfirmedSeats())
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

	        ticket.setTicketstatus("BOOKING CANCELLED"); // Delete the ticket
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
		Ticket ticketObject = ticketRepo.getById(ticketId);
		ticketObject.setTicketstatus("NOT_BOOKED");
		
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
		String bookingURL="http://localhost:8081/multiplex/bookseats/"+ticketObject.getScreeningId();
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
