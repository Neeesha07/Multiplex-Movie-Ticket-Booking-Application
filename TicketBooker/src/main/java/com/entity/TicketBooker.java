package com.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class TicketBooker {
	@Id
	@GeneratedValue
	private long bookerId;
	private String bookerName;
	private String bookerMail;
	private String bookerPassword;
	private Long bookerContact;
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL  ,mappedBy = "ticketBooker")
	private List<Ticket> bookedTickets;

	public TicketBooker(String bookerName, String bookerMail, String bookerPassword, Long bookerContact) {
		super();
		this.bookerName = bookerName;
		this.bookerMail = bookerMail;
		this.bookerPassword = bookerPassword;
		this.bookerContact = bookerContact;
	}
	
	
}
