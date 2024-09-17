package com.entity;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
public class Ticket {
	@Id
	@GeneratedValue
	private long ticketId;
	private String movieName;
	private Instant timeStamp;
	private String multiplexName;

	@ElementCollection
	private List<String> confirmedSeats;

	private String seatType;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "booker_id")
	private TicketBooker ticketBooker;

	
	  public Ticket() 
	  { 
		 this.timeStamp=Instant.now();
	  }
	 

	public Ticket(String movieName, String multiplexName, List<String> confirmedSeats, String seatType) {
		super();
		this.movieName = movieName;
		this.multiplexName = multiplexName;
		this.confirmedSeats = confirmedSeats;
		this.seatType = seatType;
		this.timeStamp = Instant.now();
	}

}
