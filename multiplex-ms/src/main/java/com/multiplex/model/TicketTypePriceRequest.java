package com.multiplex.model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketTypePriceRequest {
	private Map<String, Integer> ticketTypePrice;
}
