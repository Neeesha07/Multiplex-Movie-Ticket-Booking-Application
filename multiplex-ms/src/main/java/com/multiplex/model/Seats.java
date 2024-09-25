package com.multiplex.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Seats {
	private List<Integer> bookedSeats;
	private List<Integer> availableSeats;
	public Seats(List<Integer> bookedSeats) {
		super();
		this.bookedSeats = bookedSeats;
	}
	
}
