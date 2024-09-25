package com.multiplex.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.entity.MultiplexOwner;
import com.multiplex.entity.Screening;
import com.multiplex.model.Seats;
import com.multiplex.model.TicketTypePriceRequest;

public interface MultiplexService {
	public void addMultiplexOwner(MultiplexOwner multiplexOwner);
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId);
	public void addMovieToMultiplex(Movie movie, Long multiplexId);
	public void addScreeningToMovie(Screening screening, Long movieId);
	public List<Movie> getAllMoviesByOwnerId(Long multiplexOwnerId);
	public Boolean updateMovieDetails(Long movieId, Movie tempMovie);
	public Boolean deleteMovieFromMultiplex(Long movieId);
	public Boolean updateTicketTypePrice(Long multiplexId, TicketTypePriceRequest ticketTypePriceRequest);
	public Boolean bookSeats(Long screeningId,List<Integer> bookedSeats);
	public Boolean cancelSeats(Long screeningId,List<Integer> bookedSeats);
	public Integer getTicketsSoldDailyForAllMultiplexes(Long ownerid);
	public List<LocalTime> addTimeslot(Long multiplexId, LocalTime timelsot);
	public List<LocalTime> deleteTimeslot(Long multiplexId, LocalTime timelsot);
	public Seats getAvailableAndBookedSeats(Long screeningId);
	public List<String> getSeatTypesForSeats(List<Integer> seats, Long multiplexId);
	public void weeklyCleanUp();
}
