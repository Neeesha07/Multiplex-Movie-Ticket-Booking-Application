package com.entity;

import java.time.Instant;
import java.time.LocalDateTime;
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
@NoArgsConstructor
public class Ticket {
	@Id
	@GeneratedValue
	private Long ticketId;
	private Long movieId;
	private LocalDateTime timeStamp;
	private Long multiplexId;
	private double totalAmount;
	private String ticketstatus;
	private Long screeningId;

	@ElementCollection
	private List<Integer> confirmedSeats;

	private String seatType;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "booker_id")
	private TicketBooker ticketBooker;

	

	 

	public Ticket(Long movieId, long multiplexId, List<Integer> confirmedSeats,LocalDateTime timeStamp, String seatType,Long screeningId,double totalamount) {
		super();
		this.movieId = movieId;
		this.multiplexId = multiplexId;
		this.confirmedSeats = confirmedSeats;
		this.timeStamp = timeStamp;
		this.screeningId=screeningId;
	}


}
