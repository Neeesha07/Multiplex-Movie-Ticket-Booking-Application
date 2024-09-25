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
	private String movieName;
	private LocalDateTime timeStamp;
	private String multiplexName;
	private double totalAmount;
	private double discountedAmount;
	private String ticketstatus;
	private Long screeningId;
	private Long foreignUserId;

	@ElementCollection
	private List<Integer> confirmedSeats;
	@ElementCollection
	private List<String> seatTypes;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "booker_id")
	private TicketBooker ticketBooker;

	

	 

	public Ticket(String movieName, String multiplexName,List<String> seatTypes, List<Integer> confirmedSeats,LocalDateTime timeStamp, String seatType,Long screeningId,double totalamount) {
		super();
		this.movieName = movieName;
		this.multiplexName = multiplexName;
		this.confirmedSeats = confirmedSeats;
		this.timeStamp = timeStamp;
		this.screeningId=screeningId;
		this.seatTypes=seatTypes;
	}


}
