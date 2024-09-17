package com.service;

import java.time.LocalDateTime;
import java.util.Map;

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
public class MultiplexDaoImpl implements MultiplexDao{
	@Autowired
	MultiplexOwnerRepo ownerRepo;
	
	@Autowired
	MultiplexRepo multiplexRepo;
	
	@Autowired
	MovieRepo movieRepo;

	@Autowired
	ScreeningRepo screeningRepo;	
	
	@Override
	public void addMultiplexOwner(MultiplexOwner multiplexOwner) {
		ownerRepo.save(multiplexOwner);
	}

	@Override
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId) {
		// TODO Auto-generated method stub
		MultiplexOwner multiplexOwner = ownerRepo.findById(multiplexOwnerId).get();
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
		screeningRepo.save(screening);
		
	}
	
}
