package com.multiplex.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.multiplex.entity.BeginningEnd;
import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.entity.MultiplexOwner;
import com.multiplex.entity.Screening;
import com.multiplex.model.Seats;
import com.multiplex.model.TicketTypePriceRequest;
import com.multiplex.repo.MovieRepo;
import com.multiplex.repo.MultiplexOwnerRepo;
import com.multiplex.repo.MultiplexRepo;
import com.multiplex.repo.ScreeningRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
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
	@Transactional
	public void addMultiplexOwner(MultiplexOwner multiplexOwner) {
		multiplexOwnerRepo.save(multiplexOwner);
	}

	@Override
	@Transactional
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId) {
		// TODO Auto-generated method stub
		MultiplexOwner multiplexOwner = multiplexOwnerRepo.findById(multiplexOwnerId).get();
		List<LocalTime> timeSlots = new ArrayList<>();
        timeSlots.add(LocalTime.parse("08:30:00"));
        timeSlots.add(LocalTime.parse("11:00:00"));
        timeSlots.add(LocalTime.parse("13:00:00"));
        timeSlots.add(LocalTime.parse("18:00:00"));
        timeSlots.add(LocalTime.parse("21:30:00"));
		multiplex.setAllTimeSlots(timeSlots);
        
        Map<LocalDateTime, Integer> availableScreensPerTimeslot = new HashMap<>();
        LocalDate today = LocalDate.now();

        for (int i = 1; i <= 7; i++) {
			LocalDate currentDate = today.plusDays(i);
			for (LocalTime timeSlot : timeSlots) {
				LocalDateTime dateTimeSlot = LocalDateTime.of(currentDate, timeSlot);
				availableScreensPerTimeslot.put(dateTimeSlot, multiplex.getNumberOfScreens());
			}
		}
        multiplex.setAvailableScreensPerTimeslot(availableScreensPerTimeslot);
        
        Map<String, BeginningEnd> seatConfig = new HashMap<>();
        seatConfig.put("silver", new BeginningEnd(1, 40));
        seatConfig.put("gold", new BeginningEnd(41, 56));
        seatConfig.put("premium", new BeginningEnd(57, 64));
        
        multiplex.setSeatTypeConfig(seatConfig);
        
		multiplex.setMultiplexOwner(multiplexOwner);
		multiplexRepo.save(multiplex);
}

	@Override
	@Transactional
	public void addMovieToMultiplex(Movie movie, Long multiplexId) {
		// TODO Auto-generated method stub
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		movie.setMultiplex(multiplex);
		movieRepo.save(movie);

		
	}
	
	
	
//	This requires the automatic filling of available_screens_per_timeslot to work.
//	comparing LocalDateTime and LocalTime

	@Override
	@Transactional
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
	@Transactional
	public Boolean updateMovieDetails(Long movieId, Movie tempMovie) {
			Movie movie = movieRepo.findById(movieId).get();
			System.out.println(movie.getMovieGenre());
		movie.setMovieName(tempMovie.getMovieName());
		movie.setMovieGenre(tempMovie.getMovieGenre());
		movie.setMovieRating(tempMovie.getMovieRating());
		movie.setMovieRating(tempMovie.getMovieRating());
		movie.setMovieDescription(tempMovie.getMovieDescription());
		movie.setMovieDuration(tempMovie.getMovieDuration());
		movieRepo.save(movie);
		return true;
	}

	@Override
	@Transactional
	public Boolean deleteMovieFromMultiplex(Long movieId) {
		
		try {
			movieRepo.deleteById(movieId);		
		}catch(Exception E) {
			return false;
		}
		
		return true;
	}
	
	@Override
	@Transactional
	public Boolean updateTicketTypePrice(Long multiplexId,TicketTypePriceRequest ticketTypePriceRequest) {
		
		
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		multiplex.setTicketTypePrice(ticketTypePriceRequest.getTicketTypePrice());
		multiplexRepo.save(multiplex);
		return true;
	}

	
	@Override
	@Transactional
	public Boolean bookSeats(Long screeningId, List<Integer> bookedSeats) {
		Screening screening = screeningRepo.findById(screeningId).get();
		List<Integer> availableseats = screening.getAvailableSeats();
		
		if(availableseats.containsAll(bookedSeats)) {
//			availableseats.addAll(bookedSeats);
			availableseats.removeAll(bookedSeats);
			screening.setAvailableSeats(availableseats);
			List<Integer> finalBookedSeats = screening.getBookedSeats();
			finalBookedSeats.addAll(bookedSeats);
			screening.setBookedSeats(finalBookedSeats);
			screeningRepo.save(screening);
			return true; 
		}
		
		return false;
		
	}

	@Override
	@Transactional
	public Boolean cancelSeats(Long screeningId, List<Integer> bookedSeats) {
		Screening screening = screeningRepo.findById(screeningId).get();
		List<Integer> availableseats = screening.getAvailableSeats();
	
		if(!availableseats.containsAll(bookedSeats)) {
			availableseats.addAll(bookedSeats);
			screening.setAvailableSeats(availableseats);
			List<Integer> finalBookedSeats = screening.getBookedSeats();
			finalBookedSeats.removeAll(bookedSeats);
			screening.setBookedSeats(finalBookedSeats);
			screeningRepo.save(screening);
			return true; 
		}
		
		return false;
		
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

	@Override
	@Transactional
	public List<LocalTime> addTimeslot(Long multiplexId, LocalTime timelsot) {
		Multiplex multiplex =  multiplexRepo.findById(multiplexId).get();
		List<LocalTime> timeslots = multiplex.getAllTimeSlots();
		timeslots.add(timelsot);
		multiplexRepo.save(multiplex);
		return multiplexRepo.findById(multiplexId).get().getAllTimeSlots();
	}

	@Override
	@Transactional
	public List<LocalTime> deleteTimeslot(Long multiplexId, LocalTime timelsot) {
		Multiplex multiplex =  multiplexRepo.findById(multiplexId).get();
		List<LocalTime> timeslots = multiplex.getAllTimeSlots();
		timeslots.remove(timelsot);
		multiplexRepo.save(multiplex);
		return multiplexRepo.findById(multiplexId).get().getAllTimeSlots();
	}

	@Override
	public Seats getAvailableAndBookedSeats(Long screeningId) {
		
		Screening screening = screeningRepo.findById(screeningId).get();
		Seats seats = new Seats(screening.getBookedSeats(), screening.getAvailableSeats());
		return seats;
	}

	@Override
	@Scheduled(cron =  "0 30 21 * * SUN")
//	@Scheduled(cron = "0 * * * * ?") 
	public void weeklyCleanUp() {
		List<Multiplex> multiplexList = multiplexRepo.findAll();
		LocalDateTime now = LocalDateTime.now();
		screeningRepo.deleteAll();
		LocalDate today = LocalDate.now();

		for (Multiplex multiplex : multiplexList) {
			// Step 1: Clean up available screens per timeslot
			Map<LocalDateTime, Integer> avail = multiplex.getAvailableScreensPerTimeslot();
			avail.clear();
			List<LocalTime> timeSlots = multiplex.getAllTimeSlots();

			for (int i = 1; i <= 7; i++) {
				LocalDate currentDate = today.plusDays(i);
				for (LocalTime timeSlot : timeSlots) {
					LocalDateTime dateTimeSlot = LocalDateTime.of(currentDate, timeSlot);
					avail.put(dateTimeSlot, multiplex.getNumberOfScreens());
				}
			}
			multiplex.setAvailableScreensPerTimeslot(avail);

			multiplexRepo.save(multiplex);
		}
	}

	@Override
	public List<String> getSeatTypesForSeats(List<Integer> seats, Long multiplexId) {
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		Map<String, BeginningEnd> seatTypeConfig =  multiplex.getSeatTypeConfig();
		List<String> seatTypes = new ArrayList<>();

	    for (Integer seat : seats) {
	        String seatType = seatTypeConfig.entrySet().stream()
	            .filter(entry -> seat >= entry.getValue().getBeginning() && seat <= entry.getValue().getEnding())
	            .map(Map.Entry::getKey)
	            .findFirst()
	            .orElse("Unknown"); // Return "Unknown" if the seat doesn't match any type
	        seatTypes.add(seatType);
	    }

	    return seatTypes;
	}

	@Override
	public List<Multiplex> getAllMultiplexes() {
		return multiplexRepo.findAll();
	}

	@Override
	public Long getOwnerIdByForeignUserId(Long foreignUserId) {
		return multiplexOwnerRepo.findOwnerIdByForeignUserId(foreignUserId);
	}

	@Override
	public Boolean updateMultiplex(Long multiplexId,Multiplex tempMultiplex) {
		Multiplex multiplex = multiplexRepo.findById(multiplexId).get();
		multiplex.setMultiplexLocation(tempMultiplex.getMultiplexLocation());
		multiplex.setMultiplexName(tempMultiplex.getMultiplexName());
		multiplex.setNumberOfScreens(tempMultiplex.getNumberOfScreens());
		return true;
	}

	
}

