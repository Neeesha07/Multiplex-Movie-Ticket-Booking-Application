package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dao.PaymentsDao;
import com.entity.Payments;
import com.entity.Ticket;
import com.repository.PaymentsRepo;
import com.repository.TicketRepo;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class PaymentsDaoImpl implements PaymentsDao {

	@Autowired
	PaymentsRepo payRepo;
	
	@Autowired
	TicketRepo ticketRepo;
	

	@Override
	@Transactional
	public Payments getPaymentsbyTicket_id(Long ticketId) {
		// TODO Auto-generated method stub
		//Ticket tkt = ticketRepo.getById(ticketId);
		Payments payment = payRepo.findByTicketId(ticketId);
		return payment;
	}


	@Override
	@Transactional
	public List<Payments> getPayments() {
		// TODO Auto-generated method stub
		
		return payRepo.findAll();
		
	}


}
