package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.Discounts;


import jakarta.transaction.Transactional;

@Repository
public interface DiscountsRepo extends JpaRepository<Discounts,Long>{

	@Query("select d from Discounts d where d.applicabilityAmountLimit<=?1")
	@Transactional
	List<Discounts> getApplicableDiscountsList(double totalamount);

	
}
