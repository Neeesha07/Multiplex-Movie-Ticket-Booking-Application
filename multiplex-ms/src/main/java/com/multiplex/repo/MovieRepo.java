package com.multiplex.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long>{

}
