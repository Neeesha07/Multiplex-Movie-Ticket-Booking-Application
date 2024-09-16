package com.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "multiplex")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Multiplex {
	@Id
	@GeneratedValue
	long multiplexId;
	String multiplexName;
	String multiplexLocation;
	int numberOfScreens;
	List<LocalDateTime> allTimeSlots;
	
	@JdbcTypeCode(SqlTypes.JSON)
	Map<LocalDateTime , Integer> availableScreensPerTimeslot;
	@JdbcTypeCode(SqlTypes.JSON)
	Map<String, List<Integer>> seatTypeConfig;
	@JdbcTypeCode(SqlTypes.JSON)
	Map<String, Integer> ticketTypePrice;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "multiplex")
	List<Movie> movies;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "multiplex_Owner_Id")
	MultiplexOwner multiplexOwner;
}
