package com.service;

import java.util.List;
import java.util.Optional;

import com.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.DiscountsDao;
import com.entity.Discounts;
import com.repository.DiscountsRepo;
import com.repository.TicketRepo;

import jakarta.transaction.Transactional;



@Service
@Transactional
public class DiscountsDaoImpl implements DiscountsDao {

	@Autowired
	DiscountsRepo discRepo;

	@Autowired
	TicketRepo ticketRepo;
	
	@Override
	@Transactional
	public List<Discounts> getDiscountsList() {
		// TODO Auto-generated method stub
		
		return discRepo.findAll();
	}

	@Override
	@Transactional
	public Discounts createDiscount(Discounts discount) {
		
		discRepo.save(discount);
		return discount;
	}

	@Override
	@Transactional
	public Double applyDiscount(Long ticketId,Long discountId) {
		// TODO Auto-generated method stub
		
		Optional<Ticket> optTicket = ticketRepo.findById(ticketId);
		Ticket ticket = optTicket.get();
		double amount=ticket.getTotalAmount();
		Discounts discount = discRepo.getById(discountId);
		amount = (amount)-(amount*discount.getDiscountPercentage()/100);
		ticket.setTotalAmount(amount);
		ticketRepo.save(ticket);
		return amount;
	}

	@Override
	@Transactional
	public List<Discounts> getApplicableDiscounts(double totalamount) {
		// TODO Auto-generated method stub
		return discRepo.getApplicableDiscountsList(totalamount);
	}


}

