package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.entity.Screening;
import com.repo.ScreeningRepo;
import com.service.MultiplexService;

@RestController
@RequestMapping("/multiplex")
public class RestApp {
	
	@Autowired
	MultiplexService service;
	
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
	
}
