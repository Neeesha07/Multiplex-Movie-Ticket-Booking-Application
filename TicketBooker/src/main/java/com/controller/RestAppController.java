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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.PaymentsDao;
import com.dao.TicketBookerDao;
import com.dao.TicketDao;
import com.entity.Payments;
import com.entity.Ticket;
import com.entity.TicketBooker;
import com.entity.Discounts;
import com.service.PaymentsDaoImpl;

@RestController
@RequestMapping("/TicketBooker")
public class RestAppController 
{
	
//*************************************************	
			  //Data Access Objects//
	@Autowired 
	private TicketBookerDao ticketbookerservice;
	
	@Autowired
	private TicketDao ticketservice;
	
	@Autowired
	private PaymentsDao pdi;
	
	@Autowired
	private com.dao.DiscountsDao ddi;
	
//***************************************************
	
	
//**********************************************************************
	         //TICKET BOOKERS ENDPOINTS//
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
//***************************************************************************
	
//****************************************************************************
    				//TICKET  ENDPOINTS//
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
	
	@DeleteMapping("/deleteticket/{ticketId}")
	public String deleteTicket(@PathVariable Long ticketId) {
		ticketservice.cancelTicket(ticketId);
		return "ticket Canceled";
	}
//***************************************************************************

//***************************************************************************
					  //DISCOUNT RELATED ENDPOINTS//

	
	@PostMapping("/addDiscount")
	String addDiscount(@RequestBody Discounts discount)
	{
		ddi.createDiscount(discount);
		return "Discount Added";
	}

	
	@GetMapping("/getApplicableDiscounts/{totalamount}")
	List<Discounts> getApplicableDiscounts(@PathVariable double totalamount)
	{
		
		return ddi.getApplicableDiscounts(totalamount);
	}
	
	@PostMapping("/applyDiscount/{ticketId}")
	Double applyDisc(@PathVariable Long ticketId,@RequestBody Long discountId)
	{
		return ddi.applyDiscount(ticketId,discountId); 
	}
//***************************************************************************

//***************************************************************************
						//PAYMENTS RELATED ENDPOINTS//


	@GetMapping("getPaymentsList")
	List<Payments> allPaymentsList()
	{
		return pdi.getPayments();
	}

	@GetMapping("/getPaymentDetails/{ticketId}")
	Payments paylist(@PathVariable Long ticketId)
	{
		
		return pdi.getPaymentsbyTicket_id(ticketId);
	}
	@PostMapping("/confirmPayment/{id}")
	String confirmPaymentMethod(@PathVariable Long id,@RequestBody Payments payment)
	{
		ticketservice.confirmTicket(id, payment);
		return "BOOKING CONFIRMED";
	}

	
	@PostMapping("/cancelPayment/{ticketId}")
	String cancelPaymentMethod(@PathVariable Long ticketId )
	{
		ticketservice.transactionFailed(ticketId);
		return "payment cancelled";
	}
	
	
//***************************************************************************

	
}
