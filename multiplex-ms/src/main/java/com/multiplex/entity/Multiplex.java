package com.multiplex.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.multiplex.exception.LocalTimeDeserializer;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKey;
import jakarta.persistence.MapKeyColumn;
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
	private Long multiplexId;
	private String multiplexName;
	private String multiplexLocation;
	private int numberOfScreens;
	
	
//	Collections and Maps - 
	
	
	
	@ElementCollection
	@CollectionTable(name = "all_time_slots")
	@Column(name = "timeslot")
	@JsonDeserialize(using = LocalTimeDeserializer.class)
	private List<LocalTime> allTimeSlots;
	
//	@JdbcTypeCode(SqlTypes.JSON)
//	Map<LocalDateTime , Integer> availableScreensPerTimeslot;
//	@JdbcTypeCode(SqlTypes.JSON)
//	Map<String, List<Integer>> seatTypeConfig;
//	@JdbcTypeCode(SqlTypes.JSON)
//	Map<String, Integer> ticketTypePrice;
	
//	@ElementCollection
//	@CollectionTable(name = "available_Screens_Per_Timeslot",
//	joinColumns = @JoinColumn(name = "multiplex_Id"))
//	@MapKeyColumn(name = "timeslot")
//	@Column(name = "number_of_screens")
//	private Map<LocalDateTime , Integer> availableScreensPerTimeslot;
	
//	@OneToMany(cascade = CascadeType.ALL)
//	@JoinTable(name = "seat_type_list_mapping", 
//	joinColumns = {@JoinColumn(name = "multiplex_id", referencedColumnName = "multiplexId")},
//	inverseJoinColumns = {@JoinColumn(name = "begEndId", referencedColumnName = "begEndId")})
//	@MapKey(name = "seatType")
//	private Map<String, BeginningEnd> seatTypeConfig;
	
	
	
	@ElementCollection
	@CollectionTable(name = "available_Screens_Per_Timeslot",
	joinColumns = @JoinColumn(name = "multiplex_Id"))
	@MapKeyColumn(name = "timeslot")
	@Column(name = "number_of_screens")
	private Map<LocalDateTime , Integer> availableScreensPerTimeslot;
	
	
	@ElementCollection
	@CollectionTable(name = "seat_type_config",
	joinColumns = @JoinColumn(name = "multiplex_Id"))
	@MapKeyColumn(name = "seat_type")
	private Map<String, BeginningEnd> seatTypeConfig;

	
	@ElementCollection
	@CollectionTable(name = "ticket_type_price",
	joinColumns = @JoinColumn(name = "multiplex_Id"))
	@MapKeyColumn(name = "ticket_type")
	@Column(name = "number_of_screens")
	private Map<String, Integer> ticketTypePrice;
	
	
	
//	Mapping -
	
	
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "multiplex", orphanRemoval = false)
	private List<Movie> movies;
	
	
	@JsonBackReference
//	@ManyToOne(cascade = CascadeType.ALL)
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "multiplex_Owner_Id")
	private MultiplexOwner multiplexOwner;

	public Multiplex(String multiplexName, String multiplexLocation, int numberOfScreens,
			List<LocalTime> allTimeSlots) {
		super();
		this.multiplexName = multiplexName;
		this.multiplexLocation = multiplexLocation;
		this.numberOfScreens = numberOfScreens;
		this.allTimeSlots = allTimeSlots;
	}

	public Multiplex(String multiplexName, String multiplexLocation, int numberOfScreens,
			List<LocalTime> allTimeSlots, Map<LocalDateTime, Integer> availableScreensPerTimeslot,
			Map<String, BeginningEnd> seatTypeConfig, Map<String, Integer> ticketTypePrice) {
		super();
		this.multiplexName = multiplexName;
		this.multiplexLocation = multiplexLocation;
		this.numberOfScreens = numberOfScreens;
		this.allTimeSlots = allTimeSlots;
		this.availableScreensPerTimeslot = availableScreensPerTimeslot;
		this.seatTypeConfig = seatTypeConfig;
		this.ticketTypePrice = ticketTypePrice;
	}
	
	
	
}
