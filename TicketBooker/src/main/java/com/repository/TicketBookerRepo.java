package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.TicketBooker;

@Repository
public interface TicketBookerRepo extends JpaRepository<TicketBooker, Long>{

}
