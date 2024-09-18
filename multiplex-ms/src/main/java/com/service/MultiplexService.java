package com.service;

import java.util.List;
import java.util.Map;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.entity.Screening;
import com.model.Seats;
import com.model.TicketTypePriceRequest;

public interface MultiplexService {
	public void addMultiplexOwner(MultiplexOwner multiplexOwner);
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId);
	public void addMovieToMultiplex(Movie movie, Long multiplexId);
	public void addScreeningToMovie(Screening screening, Long movieId);
	public List<Movie> getAllMoviesByOwnerId(Long multiplexOwnerId);
	public Boolean updateMovieDetails(Long movieId, Movie tempMovie);
	public Boolean deleteMovieFromMultiplex(Long movieId);
	public Boolean updateTicketTypePrice(Long multiplexId, TicketTypePriceRequest ticketTypePriceRequest);
	public Boolean bookSeats(Long screeningId,Seats seats);
	public Integer getTicketsSoldDailyForAllMultiplexes(Long ownerid); 
}
