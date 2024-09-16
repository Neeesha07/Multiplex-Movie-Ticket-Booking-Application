package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.service.MultiplexDao;

@RestController
@RequestMapping("/multiplex")
public class RestApp {
	
	@Autowired
	MultiplexDao dao;
	
	@PostMapping("/addowner")
	public void addOwner(@RequestBody MultiplexOwner multiplexOwner) {
		dao.addMultiplexOwner(multiplexOwner);
	}
	
	@PostMapping("/addmultiplex")
	public void addMultiplex(@RequestBody Multiplex multiplex) {
		dao.addMultiplex(multiplex);
	}
}
