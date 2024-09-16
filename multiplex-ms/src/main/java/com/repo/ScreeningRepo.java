package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Multiplex;
import com.entity.Screening;

@Repository
public interface ScreeningRepo extends JpaRepository<Screening, Long>{

}
