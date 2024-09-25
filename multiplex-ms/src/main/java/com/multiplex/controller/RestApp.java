package com.multiplex.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.entity.MultiplexOwner;
import com.multiplex.entity.Screening;
import com.multiplex.model.HighestGrossingResponse;
import com.multiplex.model.PriceResponse;
import com.multiplex.model.Seats;
import com.multiplex.model.Ticket;
import com.multiplex.model.TicketRequest;
import com.multiplex.model.TicketTypePriceRequest;
import com.multiplex.repo.MultiplexRepo;
import com.multiplex.repo.ScreeningRepo;
import com.multiplex.service.MultiplexDao2;
import com.multiplex.service.MultiplexService;
import com.multiplex.service.TicketBookerDao;
import com.multiplex.service.TicketBookerDaoImpl;

@RestController
@RequestMapping("/multiplex")
@CrossOrigin(origins = "http://localhost:3000") 
public class RestApp {
	
	@Autowired
	MultiplexService service;

	@Autowired
	MultiplexDao2 dao2;

	@Autowired
	private TicketBookerDao ticketDao;
	
	@GetMapping("/movieName/{movie_id}")
	public String getMovieNameFromId(@PathVariable long movie_id){
		return dao2.movieNameFromId(movie_id);
	}

	
	@GetMapping("/multiplexName/{multiplex_id}")
	public String getMultiplexNameFromId(@PathVariable long multiplex_id){
		return dao2.multiplexNameFromId(multiplex_id);
	}
	
	@PostMapping("/addowner")
	public String addOwner(@RequestBody MultiplexOwner multiplexOwner) {
		service.addMultiplexOwner(multiplexOwner);
		return "Owner Added";
	}
	
	@PostMapping("/addmultiplex/{ownerid}")
	public String addMultiplexToOwner(@RequestBody Multiplex multiplex, @PathVariable Long ownerid) {
		
		service.addMultiplexToOwner(multiplex,ownerid);
		return "Multiplex Added";
	}
	
	@PostMapping("/addmovie/{multiplexid}")
	public String addMovieToMultiplex(@RequestBody Movie movie, @PathVariable Long multiplexid) {
		
		service.addMovieToMultiplex(movie,multiplexid);
		return "Movie Added to multiplex";
	}
	
	@PostMapping("/addscreening/{movieid}")
	public String addScreeningToMovie(@RequestBody Screening screening, @PathVariable Long movieid) {
		
		service.addScreeningToMovie(screening,movieid);
		return "Screening Added to movie";
	}
	
	@GetMapping("/getallmoviesbyownerid/{ownerid}")
	public List<Movie> addScreeningToMovie(@PathVariable Long ownerid) {
		
		List<Movie> movieList =  service.getAllMoviesByOwnerId(ownerid);
		return movieList;
	}
	
	
	@PutMapping("/updatemoviedetails/{movieid}")
	public String updateMovieDetails(@PathVariable Long movieid, @RequestBody Movie movie) {
		service.updateMovieDetails(movieid, movie);
		return "Movie Details Updated";
	}
	
	
//	Issues - If movie does not exist appropriate return message should show, 
//	right now only showing success
//	Delete owner and delete multiplex endpoints needs to be created
	
	@DeleteMapping("/deletemovie/{movieid}")
	public String deleteMovie(@PathVariable Long movieid) {
		if(service.deleteMovieFromMultiplex(movieid))
			return "Movie Deleted";
		else
			return "Failed to delete";
	}
	
	
	@PutMapping("/updatetickettypeprice/{multiplexid}")
	public String updateTicketTypePrice(@PathVariable Long multiplexid, @RequestBody TicketTypePriceRequest ticketTypePrice) {
		service.updateTicketTypePrice(multiplexid, ticketTypePrice);
		return "updated";
	}
	
	@PostMapping("/bookseats/{screeningid}")
	public String bookSeats(@PathVariable Long screeningid, @RequestBody List<Integer> seats) {
		if(service.bookSeats(screeningid, seats))
			return "updated";
		return "failed";
	}

		@PostMapping("/cancelseats/{screeningid}")
	public String cancelSeats(@PathVariable Long screeningid, @RequestBody List<Integer> seats) {
		if(service.cancelSeats(screeningid, seats))
			return "updated";
		return "failed";
	}
	
	@GetMapping("/getticketssolddaily/{ownerid}")
	public Integer bookSeats(@PathVariable Long ownerid) {
		return service.getTicketsSoldDailyForAllMultiplexes(ownerid);
		
	}

	@GetMapping("/getMovies/{multiplex_id}")
	public List<Movie> getMoviesFromMultiplex(@PathVariable long multiplex_id) {
		return dao2.getMovieFromMultiplex(multiplex_id);
	}
	
	@GetMapping("/getMultiplex/{owner_id}")
	@CrossOrigin(origins = "http://localhost:3000") 
	public List<Multiplex> getMultiplexFromOwner(@PathVariable long owner_id) {
		return dao2.getMultiplexFromOwner(owner_id);
	}
	
	@GetMapping("/getTimeSlotForMovie/{movie_id}")
	public List<LocalDateTime> getTimeSlotFromMovie(@PathVariable long movie_id) {
		return dao2.getTimeSlotFromMovie(movie_id);
	}
	
	@DeleteMapping("/delelteMultiplex/{multiplex_id}")
	public void deleteMultiplex(@PathVariable long multiplex_id) {
		dao2.deleteMultiplex(multiplex_id);
	}
	
	@DeleteMapping("/delelteTimeSlot/{screening_id}")
	public void deleteTimeSlot(@PathVariable long screening_id) {
		 dao2.deleteTimeSlot(screening_id);
	}
	
	@GetMapping("/getPrice/{multiplex_id}")
	public PriceResponse getPriceForSelectedSeat(@PathVariable long multiplex_id, @RequestBody int seatNumber) {
		return dao2.getPriceForSelectedSeat(multiplex_id, seatNumber);
	}
	
	@GetMapping("/getPrices/{multiplex_id}")
	public List<PriceResponse> getPriceForSelectedSeat(@PathVariable long multiplex_id, @RequestBody List<Integer> seatNumbers) {
		return dao2.getPriceForSelectedSeats(multiplex_id, seatNumbers);
	}
	
	@GetMapping("/getHighestGrossing/{owner_id}")
	public HighestGrossingResponse getHighestGrossingMovie(@PathVariable long owner_id) {
		return dao2.getHighestGrossingMovie(owner_id);
	}
	
	@GetMapping("/perScreenRevenue/{screening_id}")
	public int calculateScreeningRevenue(@PathVariable long screening_id) {
		return dao2.calculateScreeningRevenue(screening_id);
	}

	@PutMapping("/addtimeslot/{multiplexid}")
	public List<LocalTime> addTimeslot(@PathVariable Long multiplexid, @RequestBody LocalTime timelsot) {
		
		return service.addTimeslot(multiplexid, timelsot);
	}
	
	@DeleteMapping("/deletetimeslot/{multiplexid}")
	public List<LocalTime> deleteTimeslot(@PathVariable Long multiplexid, @RequestBody LocalTime timelsot) {
		return service.deleteTimeslot(multiplexid, timelsot);
	}

//	@GetMapping("/deletetimeslot/{movieId}")
//	public List<Multiplex> findMultiplexByMovie(@PathVariable Long movieId){
//		return dao2.findMultiplexByMovie(movieId);
//	}

	@GetMapping("/allMovies")
	public List<Movie> listAllMovies(){
		return dao2.listAllMovies();
	}
	
	@GetMapping("/multiplexByMovies/{movie_id}")
	public List<Multiplex> listAllMultiplexByMovie(@PathVariable Long movie_id){
		return dao2.findMultiplexByMovie(movie_id);
	}
	
	@GetMapping("/allMultiplexesByMovieName/{movieName}")
	public List<Multiplex> listAllMultiplexByMovieName(@PathVariable String movieName){
		return dao2.findMultiplexesByMovieName(movieName);
	}
	

	@PostMapping("/totalMoney/{multiplex_id}")
	public double calculateTotalMoney(@PathVariable long multiplex_id, @RequestBody List<Integer> bookedSeats) {
		return dao2.totalMoney(multiplex_id, bookedSeats);
	}
		
	
	//The only method with webclient
	
	@PostMapping("/createNewTicket/{booking_id}")
	public Ticket createTicket(@PathVariable long booking_id, @RequestBody TicketRequest ticketRequest) {
		return ticketDao.createTicket(booking_id, ticketRequest);
	}
	
	@PutMapping("/weeklyCleanup")
	public void weeklyCleanup() {
		service.weeklyCleanUp();
	}
	
}
