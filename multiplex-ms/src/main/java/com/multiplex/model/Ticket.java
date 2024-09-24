package com.multiplex.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	private Long movieId;
	private LocalDateTime timeStamp;
	private Long multiplexId;
	private double totalAmount;
	private Long screeningId;
	private List<Integer> confirmedSeats;

}
