package com.dao;


import java.util.List;

import com.entity.Payments;



public interface PaymentsDao {
	
	

	Payments getPaymentsbyTicket_id(Long ticketId);
	List<Payments> getPayments();
	
}
