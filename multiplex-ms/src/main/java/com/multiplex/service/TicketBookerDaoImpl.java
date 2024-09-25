package com.multiplex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientSsl;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.multiplex.entity.Screening;
import com.multiplex.model.Ticket;
import com.multiplex.model.TicketRequest;
import com.multiplex.repo.MovieRepo;
import com.multiplex.repo.MultiplexOwnerRepo;
import com.multiplex.repo.MultiplexRepo;
import com.multiplex.repo.ScreeningRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TicketBookerDaoImpl implements TicketBookerDao{
	
	@Autowired
	MultiplexRepo multiplexRepo;
	@Autowired
	MultiplexOwnerRepo ownerRepo;
	@Autowired
	MovieRepo movieRepo;
	@Autowired
	ScreeningRepo screeningRepo;
	
	@Autowired
	@Qualifier("webclient")
	private WebClient.Builder builder;
	
	MultipleDao2Impl dao2 = new MultipleDao2Impl();
	
	@Override
	public Ticket createTicket(long booker_id, TicketRequest ticketRequest) {
		Ticket ticket = new Ticket();
		Screening screening = screeningRepo.findById(ticketRequest.getScreening_id()).get();
		long multiplex_id = screening.getMovie().getMultiplex().getMultiplexId();
		ticket.setScreeningId(ticketRequest.getScreening_id());
		ticket.setConfirmedSeats(ticketRequest.getBooked_seats());
		ticket.setTimeStamp(screening.getTimeSlot());
		ticket.setMovieId(screening.getMovie().getMovieId());
		ticket.setMultiplexId(multiplex_id);
		ticket.setTotalAmount(dao2.totalMoney(multiplex_id, ticketRequest.getBooked_seats()));
		
		String url = "http://localhost:8082/ticketBooker/createticket/"+booker_id;
		Ticket new_ticket = builder.build()
		.post()
		.uri(url)
		.bodyValue(ticket)
		.retrieve()
		.bodyToMono(Ticket.class)
		.block();
		
		return new_ticket;
		
//		return ticket;
	}

	

}
