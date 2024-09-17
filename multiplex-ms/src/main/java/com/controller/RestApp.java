package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.service.MultiplexDao;

@RestController
@RequestMapping("/multiplex")
public class RestApp {
	
	@Autowired
	MultiplexDao dao;
	
	@PostMapping("/addowner")
	public void addOwner(@RequestBody MultiplexOwner multiplexOwner) {
		dao.addMultiplexOwner(multiplexOwner);
	}
	
	@PostMapping("/addmultiplex/{ownerid}")
	public void addMultiplexToOwner(@RequestBody Multiplex multiplex, @PathVariable Long ownerid) {
		
		dao.addMultiplexToOwner(multiplex,ownerid);
	}
	
	@PostMapping("/addmovie/{multiplexid}")
	public void addMovieToMultiplex(@RequestBody Movie movie, @PathVariable Long multiplexid) {
		
		dao.addMovieToMultiplex(movie,multiplexid);
	}
	
	@PostMapping("/addscreening/{movieid}")
	public void addScreeningToMovie(@RequestBody Screening screening, @PathVariable Long movieid) {
		
		dao.addScreeningToMovie(screening,movieid);
	}
	
}
