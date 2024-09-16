package com.entity;

import java.util.List;

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
@Table(name = "movie")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Movie {
	@Id
	@GeneratedValue
	private Long movieId;
	private String movieName;
	private String movieGenre;
	private String movieRating;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "multiplex_Id")
	private Multiplex multiplex;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "movie")
	private List<Screening> screenings;
}
