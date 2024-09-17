package com.service;

import com.entity.Movie;
import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.entity.Screening;

public interface MultiplexDao {
	public void addMultiplexOwner(MultiplexOwner multiplexOwner);
	public void addMultiplexToOwner(Multiplex multiplex, Long multiplexOwnerId);
	public void addMovieToMultiplex(Movie movie, Long multiplexId);
	public void addScreeningToMovie(Screening screening, Long movieId);
}
