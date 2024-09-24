package com.dao;

import java.util.List;

import com.entity.Discounts;




public interface DiscountsDao {
	
	
	Discounts createDiscount(Discounts discount);
	
	List<Discounts> getDiscountsList();
	
	List<Discounts> getApplicableDiscounts(double totalamount);
	
	Double applyDiscount(Long ticketId,Long discountId);

	
}
