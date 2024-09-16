package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.repo.MultiplexOwnerRepo;
import com.repo.MultiplexRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MultiplexDAOImpl implements MultiplexDAO{
	
	@Autowired
	MultiplexRepo multiplexRepo;
	
	@Autowired
	MultiplexOwnerRepo ownerRepo;

	@Override
	public void addMultiplex(long ownerid, Multiplex multiplex) {
		MultiplexOwner mo = ownerRepo.findById(ownerid).get();
		multiplex.setMultiplexOwner(mo);
		multiplexRepo.save(multiplex);
	}

	@Override
	public void addOwner(MultiplexOwner owner) {
		ownerRepo.save(owner);
		
	}

}
