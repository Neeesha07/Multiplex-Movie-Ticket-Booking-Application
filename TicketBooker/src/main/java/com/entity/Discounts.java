package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Discounts {
	@Id
	private Long discountId;
	private String discountCode;
	private int discountPercentage;
	private Double applicabilityAmountLimit;
}

