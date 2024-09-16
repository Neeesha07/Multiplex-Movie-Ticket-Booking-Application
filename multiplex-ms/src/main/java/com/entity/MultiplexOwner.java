package com.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "multiplex_owner")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MultiplexOwner {
	@Id
	@GeneratedValue
	long multiplexOwnerId;
	String multiplexOwnerName;
	String multiplexOwnerMail;
	String multiplexOwnerPassword;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "multiplexOwner")
	List<Multiplex> multiplexList;

	public MultiplexOwner(String multiplexOwnerName, String multiplexOwnerMail, String multiplexOwnerPassword) {
		super();
		this.multiplexOwnerName = multiplexOwnerName;
		this.multiplexOwnerMail = multiplexOwnerMail;
		this.multiplexOwnerPassword = multiplexOwnerPassword;
	}
	
}
