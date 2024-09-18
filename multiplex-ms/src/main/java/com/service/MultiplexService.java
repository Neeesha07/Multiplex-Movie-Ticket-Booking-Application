package com.service;

import java.util.List;
import java.util.Map;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.entity.Screening;

public interface MultiplexService {
	public void addMultiplexOwner(MultiplexOwner multiplexOwner);
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId);
	public void addMovieToMultiplex(Movie movie, Long multiplexId);
	public void addScreeningToMovie(Screening screening, Long movieId);
	public List<Movie> getAllMoviesByOwnerId(Long multiplexOwnerId);
	public Boolean updateMovieDetails(Long movieId, String movieName, String movieGenre, String movieRating);
	public Boolean deleteMovieFromMultiplex(Long movieId);
	public Boolean setTicketTypePrice(Long multiplexId, Map<String, Integer> ticketTypePrice);
	public Boolean bookSeats(Long screeningId,List<Integer> bookedSeats);
}
