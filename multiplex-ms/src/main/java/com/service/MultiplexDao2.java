package com.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.Screening;
import com.model.HighestGrossingResponse;
import com.model.PriceResponse;
import com.model.Seats;

public interface MultiplexDao2 {
	public void updateMultiplexDetails(long multiplex_id, String multiplex_name, String Multiplex_location, int noofScreens);
	public List<Multiplex> getMultiplexFromOwner(long owner_id);
	public List<Movie> getMovieFromMultiplex(long multiplex_id);
	public List<LocalDateTime> getTimeSlotFromMovie(long movie_id);
	public void deleteMultiplex(long multiplex_id);
	public void deleteTimeSlot(long screening_id);
	public PriceResponse getPriceForSelectedSeat(long multiplex_id, int seatNumber);
	public List<PriceResponse> getPriceForSelectedSeats(long multiplex_id, List<Integer> seatNumbers);
	public HighestGrossingResponse getHighestGrossingMovie(long multiplex_owner_id);
	public int calculateScreeningRevenue(long screening_id);
	public Boolean bookSeats(Long screeningId,Seats seats);
	public Map<LocalDateTime, Integer> getTotalTicketsSoldPerDay(long multiplexOwnerId);

}
