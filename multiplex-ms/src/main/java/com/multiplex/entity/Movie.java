package com.multiplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
	private String movieDescription;
	private String moviePoster;
	private String movieDuration;
	
	@JsonBackReference
//	@ManyToOne(cascade = CascadeType.ALL)
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "multiplex_Id")
	private Multiplex multiplex;
	
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "movie", orphanRemoval = false)
	private List<Screening> screenings;

	public Movie(String movieName, String movieGenre, String movieRating, String movieDescription, String moviePoster,
			String movieDuration) {
		super();
		this.movieName = movieName;
		this.movieGenre = movieGenre;
		this.movieRating = movieRating;
		this.movieDescription = movieDescription;
		this.moviePoster = moviePoster;
		this.movieDuration = movieDuration;
	}
	
	
	
}
