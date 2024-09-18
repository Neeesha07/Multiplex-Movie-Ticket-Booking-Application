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
		try {
			Movie movie = movieRepo.findById(movieId).get();
		movie.setMovieName(tempMovie.getMovieName());
		movie.setMovieGenre(tempMovie.getMovieGenre());
		movie.setMovieRating(tempMovie.getMovieRating());
		}catch(Exception E)
		{
			return false;
		}
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
	public Boolean setTicketTypePrice(Long multiplexId, Map<String, Integer> ticketTypePrice) {
		
		
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		multiplex.setTicketTypePrice(ticketTypePrice);
		return true;
	}

	
//	WIP, update seats
	@Override
	public Boolean bookSeats(Long screeningId, List<Integer> bookedSeats) {
		Screening screening = screeningRepo.findById(screeningId).get();
		screening.setBookedSeats(bookedSeats);
		return true; 
	}
	
}
