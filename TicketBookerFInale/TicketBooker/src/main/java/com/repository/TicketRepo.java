package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.entity.Ticket;


@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long>{
	@Query("SELECT t FROM Ticket t WHERE t.ticketBooker.bookerId = ?1 AND t.ticketstatus = 'BOOKED'")
	List<Ticket> findTicketByBookerId(Long bookerid);
    
   
}
