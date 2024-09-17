package com.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Screening")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Screening {
	@Id
	@GeneratedValue
	private Long screeningId;
	private LocalDateTime timeSlot;
	
	@ElementCollection
	@CollectionTable(name = "available_seats")
	@Column(name = "seats")
	private List<Integer> availableSeats;
	
	@ElementCollection
	@CollectionTable(name = "booked_seats")
	@Column(name = "seats")
	private List<Integer> bookedSeats;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_id")
	private Movie movie;

	public Screening(LocalDateTime timeSlot, List<Integer> availableSeats, List<Integer> bookedSeats) {
		super();
		this.timeSlot = timeSlot;
		this.availableSeats = availableSeats;
		this.bookedSeats = bookedSeats;
	}
	
	
}
