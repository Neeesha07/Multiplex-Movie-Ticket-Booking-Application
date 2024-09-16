package com.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
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
	private List<Integer> availableSeats;
	private List<Integer> bookedSeats;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_id")
	private Movie movie;
	
	
}
