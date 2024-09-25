package com.multiplex.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multiplex.entity.BeginningEnd;
import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.entity.MultiplexOwner;
import com.multiplex.entity.Screening;
import com.multiplex.model.HighestGrossingResponse;
import com.multiplex.model.PriceResponse;
import com.multiplex.model.Seats;
import com.multiplex.repo.MovieRepo;
import com.multiplex.repo.MultiplexOwnerRepo;
import com.multiplex.repo.MultiplexRepo;
import com.multiplex.repo.ScreeningRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MultipleDao2Impl implements MultiplexDao2{
	
	@Autowired
	MultiplexRepo multiplexRepo;
	@Autowired
	MultiplexOwnerRepo ownerRepo;
	@Autowired
	MovieRepo movieRepo;
	@Autowired
	ScreeningRepo screeningRepo;

		@Override
	public String movieNameFromId(long movieId) {
		return movieRepo.findById(movieId).get().getMovieName();
	}

	@Override
	public String multiplexNameFromId(long multiplexId) {
		return multiplexRepo.findById(multiplexId).get().getMultiplexName();
	}

	@Override
	@Transactional
	public void updateMultiplexDetails(long multiplex_id, String multiplex_name, String Multiplex_location, int noofScreens) {
		Multiplex multiplex = multiplexRepo.findById(multiplex_id).get();
		multiplex.setMultiplexName(multiplex_name);
		multiplex.setMultiplexLocation(Multiplex_location);
		multiplex.setNumberOfScreens(noofScreens);
		
		multiplexRepo.save(multiplex);
	}

	@Override
	public List<Multiplex> getMultiplexFromOwner(long owner_id) {
		return ownerRepo.findById(owner_id).get().getMultiplexList();
	}

	@Override
	public List<Movie> getMovieFromMultiplex(long multiplex_id) {
		// TODO Auto-generated method stub
		return multiplexRepo.findById(multiplex_id).get().getMovies();
	}

	@Override
	public List<LocalDateTime> getTimeSlotFromMovie(long movie_id) {
		List<LocalDateTime> allTimeSlots = new ArrayList<LocalDateTime>();
		for(Screening screening: movieRepo.findById(movie_id).get().getScreenings()) {
		allTimeSlots.add(screening.getTimeSlot());
		}
		return allTimeSlots;
	}

	@Override
	@Transactional
	public void deleteMultiplex(long multiplex_id) {
		multiplexRepo.deleteById(multiplex_id);
	}

	@Override
	@Transactional
	public void deleteTimeSlot(long screening_id) {
		screeningRepo.deleteById(screening_id);
	}
	
	@Override
	public PriceResponse getPriceForSelectedSeat(Long multiplex_id, int seatNumber) {
		Multiplex multiplex = multiplexRepo.findById(multiplex_id).get();
		Map<String, BeginningEnd> seatTypeConfig = multiplex.getSeatTypeConfig();
		String seatType = getSeatTypeForSeat(seatNumber, seatTypeConfig);
    	return new PriceResponse(seatNumber,
    					seatType,
    					multiplex.getTicketTypePrice().get(seatType));
		
	}

	@Override
	public List<PriceResponse> getPriceForSelectedSeats(long multiplex_id, List<Integer> seatNumbers) {
		List<PriceResponse> priceList = new ArrayList<PriceResponse>();
		Multiplex multiplex = multiplexRepo.findById(multiplex_id).get();
		Map<String, BeginningEnd> seatTypeConfig = multiplex.getSeatTypeConfig();
		for(int seat:seatNumbers) {
					String seatType = getSeatTypeForSeat(seat, seatTypeConfig);
		        	priceList.add(new PriceResponse(seat,
		        					seatType,
		        					multiplex.getTicketTypePrice().get(seatType)));
		}
		return priceList;
	}
	
	public String getSeatTypeForSeat(int seat, Map<String, BeginningEnd> seatTypeConfig) {
	    // Iterate through seat types and their configurations
	    for (Map.Entry<String, BeginningEnd> entry : seatTypeConfig.entrySet()) {
	        BeginningEnd range = entry.getValue();
	        if (seat >= range.getBeginning() && seat <= range.getEnding()) {
	            return entry.getKey();
	        }
	    }
	    return "nothing";
	}

	@Override
	public HighestGrossingResponse getHighestGrossingMovie(long owner_id) {
		List<Multiplex> multiplexList = getMultiplexFromOwner(owner_id);
		Map<Movie, Integer> movieRevenueMap = new HashMap<>();
		for(Multiplex multiplex: multiplexList) {
			List<Movie> movieList = multiplex.getMovies();
			for(Movie movie:movieList) {
				List<Screening> screeningList = movie.getScreenings();
				int totalRevenue=0;
				for (Screening screening : screeningList) {
                    int screeningRevenue = calculateScreeningRevenue(screening.getScreeningId());
                    totalRevenue += screeningRevenue;
                }
				movieRevenueMap.put(movie, movieRevenueMap.getOrDefault(movie, 0) + totalRevenue);
			}
		}
		Movie grossingMovie = movieRevenueMap.entrySet().stream()
	            .max(Map.Entry.comparingByValue())
	            .orElseThrow(() -> new RuntimeException("No movies found"))
	            .getKey();
		return new HighestGrossingResponse(grossingMovie.getMovieName(), movieRevenueMap.get(grossingMovie));
		
	}
	
	@Override
	public int calculateScreeningRevenue(long screening_id) {
		Screening screening = screeningRepo.getById(screening_id);
        int revenue = 0;
        Multiplex multiplex = screening.getMovie().getMultiplex();
        List<Integer> bookedSeats = screening.getBookedSeats();
        for (int seat : bookedSeats) {
        	revenue+=getPriceForSelectedSeat(multiplex.getMultiplexId(),seat).getTicketAmount();
        }
        return revenue;
    }
	
	@Override
    public Map<LocalDateTime, Integer> getTotalTicketsSoldPerDay(long multiplexOwnerId) {
        MultiplexOwner owner = ownerRepo.findById(multiplexOwnerId).get();
            return null;
    }
	
	@Override
	public List<Multiplex> findMultiplexesByMovieName(String movieName) {
	    List<Multiplex> multiplexList = multiplexRepo.findAll();
	    return multiplexList.stream()
	        .filter(multiplex -> multiplex.getMovies().stream()
	            .anyMatch(movie -> movie.getMovieName().equalsIgnoreCase(movieName))) // Assuming movie names are the same
	        .collect(Collectors.toList());
	}
	
	
	@Override
	public List<Multiplex> findMultiplexByMovie(Long movieId) {
		List<Multiplex> multiplexList = multiplexRepo.findAll();
		String movieName = movieRepo.findById(movieId).get().getMovieName();
		return multiplexList.stream()
	            .filter(multiplex -> multiplex.getMovies().stream()
	                .anyMatch(movie ->movie.getMovieName().equalsIgnoreCase(movieName)))
	            .collect(Collectors.toList());
	}
	
	
	@Override
	public List<Movie> listAllMovies() {
		 return movieRepo.findAll();
	}

	@Override
	public double totalMoney(Long multiplex_id, List<Integer> bookedSeats) {
		double totalMoney=0.0;
		for(Integer seat: bookedSeats) {
			totalMoney += getPriceForSelectedSeat(multiplex_id, seat).getTicketAmount();
		}
		return totalMoney;
	}

	

	
}
