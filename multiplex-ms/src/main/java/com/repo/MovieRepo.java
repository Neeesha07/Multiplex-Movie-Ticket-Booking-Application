package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Movie;
import com.entity.Multiplex;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long>{

}
