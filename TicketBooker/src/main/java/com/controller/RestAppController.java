package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.TicketBookerDao;
import com.dao.TicketDao;
import com.entity.Ticket;
import com.entity.TicketBooker;

@RestController
@RequestMapping("/TicketBooker")
public class RestAppController {
	
	@Autowired 
	private TicketBookerDao ticketbookerservice;
	
	@Autowired
	private TicketDao ticketservice;
	
	@PostMapping("/addbooker")
	public String CreateTicketBooker(@RequestBody TicketBooker booker)
	{
		ticketbookerservice.addBooker(booker);
		return "User registered";
	}
	
	@GetMapping("/getbookerbyid/{id}")
	public TicketBooker GetBookerById(@PathVariable Long id) {
		return ticketbookerservice.getticketBooker(id);
	}
	
	@GetMapping("/getallbookers")
	public List<TicketBooker> getallbooker(){
		return ticketbookerservice.getallticketBooker(); 
	}
	
	@PutMapping("/updatebooker/{id}")
	public TicketBooker updateticketbooker(@PathVariable Long id,@RequestBody TicketBooker newbooker) {
		return ticketbookerservice.EditProfile(id, newbooker);
	}
	
	@DeleteMapping("deletebooker/{id}")
	public String DeleteBooker(@PathVariable Long id) {
		ticketbookerservice.deleteBooker(id);
		return "deleted";
	}
	
	
	@PostMapping("/createticket/{bookerId}")
	public String CreateTicket(@PathVariable Long bookerId,@RequestBody Ticket ticket) {
		ticketservice.AddTicket(bookerId, ticket);
		return "Ticket created";
	}
	
	@GetMapping("/getticket/{id}")
	public Ticket getticket(@PathVariable Long id) {
		return ticketservice.getTicket(id);
	}
	
	@GetMapping("getticketsbybooker/{bookerId}")
	public List<Ticket> getticketsbybooker(@PathVariable Long bookerId){
		return ticketservice.getTicketsByBookerId(bookerId);
	}
	
	@DeleteMapping("/deleteticket/{id}")
	public String deleteTicket(@PathVariable Long id) {
		ticketservice.cancelTicket(id);
		return "ticket Canceled";
	}
	

	
}
