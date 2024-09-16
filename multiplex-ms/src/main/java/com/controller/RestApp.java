package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;
import com.service.MultiplexDAO;


@Controller
@RequestMapping("/multiplexApp")
public class RestApp {
	@Autowired
	private MultiplexDAO multiplexDao;
	
	@PostMapping("/addmultiplex/{owner_id}")
	@ResponseBody
	public String addMultiplex(@PathVariable long owner_id,@RequestBody Multiplex m) {
		multiplexDao.addMultiplex(owner_id, m);
		return "Multiplex added";
	}
	
	@PostMapping("/addowner")
	@ResponseBody
	public String addOwner(@RequestBody MultiplexOwner o) {
		multiplexDao.addOwner(o);
		return "Owner added";
	}
	
	

}
