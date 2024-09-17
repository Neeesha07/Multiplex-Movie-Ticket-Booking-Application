package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.TicketBookerDao;
import com.entity.TicketBooker;
import com.repository.TicketBookerRepo;

import jakarta.transaction.Transactional;


@Service
public class TicketBookerImpl implements TicketBookerDao {
	@Autowired
	private TicketBookerRepo ticketBookerrepo;
	
	@Override
	@Transactional
	public void addBooker(TicketBooker booker) {
		// TODO Auto-generated method stub
		ticketBookerrepo.save(booker);
		
	}

	@Override
	@Transactional
	public TicketBooker getticketBooker(long id) {
		// TODO Auto-generated method stub
		return ticketBookerrepo.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public void deleteBooker(long id) {
		// TODO Auto-generated method stub
		ticketBookerrepo.deleteById(id);
		
	}

	@Override
	@Transactional
	public TicketBooker EditProfile(long id, TicketBooker ticketbookerDetails) {
		// TODO Auto-generated method stub
		TicketBooker ticketBooker=getticketBooker(id);
		if(ticketBooker!=null) {
			ticketBooker.setBookerMail(ticketbookerDetails.getBookerMail());
			ticketBooker.setBookerName(ticketbookerDetails.getBookerName());
			ticketBooker.setBookerContact(ticketbookerDetails.getBookerContact());
			ticketBooker.setBookerPassword(ticketbookerDetails.getBookerPassword());
			return ticketBookerrepo.save(ticketBooker);
		}
		return null;
		
	}

	@Override
	@Transactional
	public List<TicketBooker> getallticketBooker() {
		// TODO Auto-generated method stub
		
		return ticketBookerrepo.findAll();
	}

}
