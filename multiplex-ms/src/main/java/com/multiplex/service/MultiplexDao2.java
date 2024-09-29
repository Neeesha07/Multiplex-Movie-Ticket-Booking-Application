package com.multiplex.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.entity.Screening;
import com.multiplex.model.Feedback;
import com.multiplex.model.HighestGrossingResponse;
import com.multiplex.model.PriceResponse;
import com.multiplex.model.Seats;

public interface MultiplexDao2 {
	public String movieNameFromId(long movieId);
	public String multiplexNameFromId(long multiplexId);
	public List<Multiplex> getMultiplexFromOwner(long owner_id);
	public List<Movie> getMovieFromMultiplex(long multiplex_id);
	public List<LocalDateTime> getTimeSlotFromMovie(long movie_id);
	public PriceResponse getPriceForSelectedSeat(Long multiplex_id, int seatNumber);
	public List<PriceResponse> getPriceForSelectedSeats(long multiplex_id, List<Integer> seatNumbers);
	public HighestGrossingResponse getHighestGrossingMovie(long multiplex_owner_id);
	public int calculateScreeningRevenue(long screening_id);
	public Map<LocalDateTime, Integer> getTotalTicketsSoldPerDay(long multiplexOwnerId);
	public List<Multiplex> findMultiplexesByMovieName(String movieName);
	public List<Multiplex> findMultiplexByMovie(Long movieId);
	public List<Movie> listAllMovies();
	public double totalMoney(Long multiplex_id, List<Integer> bookedSeats);
	public Feedback addFeedback(String title, String feedbackBody);
	public List<Movie> listAllMoviesByOwner(Long ownerid);


	
	
	public void updateMultiplexDetails(long multiplex_id, String multiplex_name, String Multiplex_location, int noofScreens);
	
	
	public void deleteMultiplex(long multiplex_id);
	public void deleteTimeSlot(long screening_id);

//	public List<String> listAllMovies();
//	public List<Multiplex> findMultiplexByMovie(String movieName);
	
	String getKafkaMessage();

}
