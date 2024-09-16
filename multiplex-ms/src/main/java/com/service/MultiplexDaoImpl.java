package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.repo.MultiplexOwnerRepo;
import com.repo.MultiplexRepo;

@Service
public class MultiplexDaoImpl implements MultiplexDao{
	@Autowired
	MultiplexOwnerRepo ownerRepo;
	
	@Autowired
	MultiplexRepo multiplexRepo;

	@Override
	public void addMultiplexOwner(MultiplexOwner multiplexOwner) {
		ownerRepo.save(multiplexOwner);
	}

	@Override
	public void addMultiplex(Multiplex multiplex) {
		// TODO Auto-generated method stub
		multiplexRepo.save(multiplex);
		
	}
	
}
