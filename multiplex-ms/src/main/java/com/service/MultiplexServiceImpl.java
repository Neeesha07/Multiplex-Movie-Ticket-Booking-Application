package com.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.entity.Screening;
import com.model.Seats;
import com.model.TicketTypePriceRequest;
import com.repo.MovieRepo;
import com.repo.MultiplexOwnerRepo;
import com.repo.MultiplexRepo;
import com.repo.ScreeningRepo;

@Service
public class MultiplexServiceImpl implements MultiplexService{
	@Autowired
	MultiplexOwnerRepo multiplexOwnerRepo;
	
	@Autowired
	MultiplexRepo multiplexRepo;
	
	@Autowired
	MovieRepo movieRepo;

	@Autowired
	ScreeningRepo screeningRepo;	
	
	@Override
	public void addMultiplexOwner(MultiplexOwner multiplexOwner) {
		multiplexOwnerRepo.save(multiplexOwner);
	}

	@Override
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId) {
		// TODO Auto-generated method stub
		MultiplexOwner multiplexOwner = multiplexOwnerRepo.findById(multiplexOwnerId).get();
		multiplex.setMultiplexOwner(multiplexOwner);
		multiplexRepo.save(multiplex);
		
	}

	@Override
	public void addMovieToMultiplex(Movie movie, Long multiplexId) {
		// TODO Auto-generated method stub
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		movie.setMultiplex(multiplex);
		movieRepo.save(movie);

		
	}

	@Override
	public void addScreeningToMovie(Screening screening, Long movieId) {
		// TODO Auto-generated method stub
		Movie movie = movieRepo.findById(movieId).get();
		Multiplex multiplex = movie.getMultiplex();
		Map<LocalDateTime, Integer> avail = multiplex.getAvailableScreensPerTimeslot();
		avail.put(screening.getTimeSlot(), avail.get(screening.getTimeSlot()) -1);
		multiplex.setAvailableScreensPerTimeslot(avail);
		screening.setMovie(movie);
		screening.setAvailableSeats(IntStream.rangeClosed(1, 64)
				.boxed()
				.collect(Collectors.toList())
				);
		screeningRepo.save(screening);
		
	}

	@Override
	public List<Movie> getAllMoviesByOwnerId(Long multiplexOwnerId) {
		MultiplexOwner multiplexOwner = multiplexOwnerRepo.getById(multiplexOwnerId);
		List<Multiplex> multiplexList = multiplexOwner.getMultiplexList();

		List<Movie> movieList = new ArrayList<Movie>();		
		for(Multiplex multiplex:multiplexList) {
			List<Movie> tempMovieList = new ArrayList<Movie>();
			tempMovieList = multiplex.getMovies();
			
			
			movieList = Stream.of(tempMovieList, movieList)
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());  
		}
		return movieList;
		
		
		
	}

	@Override
	public Boolean updateMovieDetails(Long movieId, Movie tempMovie) {
			Movie movie = movieRepo.findById(movieId).get();
			System.out.println(movie.getMovieGenre());
		movie.setMovieName(tempMovie.getMovieName());
		movie.setMovieGenre(tempMovie.getMovieGenre());
		movie.setMovieRating(tempMovie.getMovieRating());
		movieRepo.save(movie);
		return true;
	}

	@Override
	public Boolean deleteMovieFromMultiplex(Long movieId) {
		
		try {
			movieRepo.deleteById(movieId);		
		}catch(Exception E) {
			return false;
		}
		
		return true;
	}
	
	@Override
	public Boolean updateTicketTypePrice(Long multiplexId,TicketTypePriceRequest ticketTypePriceRequest) {
		
		
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		multiplex.setTicketTypePrice(ticketTypePriceRequest.getTicketTypePrice());
		multiplexRepo.save(multiplex);
		return true;
	}

	
//	WIP, update seats
	@Override
	public Boolean bookSeats(Long screeningId, Seats seats) {
		Screening screening = screeningRepo.findById(screeningId).get();
		List<Integer> availableseats = screening.getAvailableSeats();
		List<Integer> bookedSeats = screening.getBookedSeats();
		if(availableseats.containsAll(bookedSeats)) {
			availableseats.addAll(bookedSeats);
			availableseats.removeAll(bookedSeats);
		}
		screening.setBookedSeats(seats.getBookedSeats());
		screeningRepo.save(screening);
		return true; 
	}

	@Override
	public Integer getTicketsSoldDailyForAllMultiplexes(Long ownerid) {
		MultiplexOwner owner = multiplexOwnerRepo.findById(ownerid).get();
		List<Multiplex> multiplexList = owner.getMultiplexList();
//		List<Integer> totalTickets = owner.getMultiplexList().stream()
//				.forEach(e->e.getMovies().stream().
//						forEach(e->e.getScreenings().stream()
//								.forEach(e->e.getBookedSeats().stream())))
//				.;
		
		
		List<Integer> totalTickets = owner.getMultiplexList().stream()
			    .flatMap(multiplex -> multiplex.getMovies().stream()
			        .flatMap(movie -> movie.getScreenings().stream()
			            .flatMap(screening -> screening.getBookedSeats().stream())))
			    .collect(Collectors.toList());

		
		return totalTickets.size();
	}
	
}
