package com.multiplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	private Long multiplexOwnerId;
	private Long foreignUserId;
	private String multiplexOwnerName;
	private String multiplexOwnerMail;
//	private String multiplexOwnerPassword;
	
	@JsonManagedReference()
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "multiplexOwner", orphanRemoval = false)
	private List<Multiplex> multiplexList;
	
}
