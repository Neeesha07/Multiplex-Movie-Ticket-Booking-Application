package com.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.Payments;
import com.entity.Ticket;

import jakarta.transaction.Transactional;

@Repository
public interface PaymentsRepo extends JpaRepository<Payments,Long>{

	
	@Query("select p from Payments p where p.ticket.ticketId=?1")
	@Transactional
	public Payments findByTicketId(Long ticket);
}
