package com.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payments {
	@Id
	private Long transactionId;
	private String upiId;
	private String captcha;
	private String paymentStatus;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="ticketId")
	private Ticket ticket;
	//private boolean status;
	 public Payments(String upiId,String captcha)
	{
		this.transactionId=(long) (Math.random() * 1_000_000_0000L);
		this.upiId=upiId;
		this.captcha=captcha;
		this.paymentStatus="TRANSACTION_SUCCESS";
	}

}
