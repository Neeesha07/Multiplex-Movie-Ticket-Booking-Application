package com.multiplex.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HighestGrossingResponse {
	String movieName;
	int revenue;

}
