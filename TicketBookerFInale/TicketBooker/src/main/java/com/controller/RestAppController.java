package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.PaymentsDao;
import com.dao.TicketBookerDao;
import com.dao.TicketDao;
import com.entity.Payments;
import com.entity.Ticket;
import com.entity.TicketBooker;
import com.model.DiscountRequest;
import com.entity.Discounts;
import com.service.PaymentsDaoImpl;

@RestController
@RequestMapping("/ticketBooker") 
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
	@GetMapping("/getBookerByForeignUserId/{foreignUserId}")
	public TicketBooker getBooker(@PathVariable Long foreignUserId)
	{
		return ticketbookerservice.getTicketBookerIdbyForeignUserId(foreignUserId);
	}
//***************************************************************************
	
//****************************************************************************
    				//TICKET  ENDPOINTS//
	@PostMapping("/createticket/{bookerId}")
	public Ticket createTicket(@PathVariable Long bookerId,@RequestBody Ticket ticket) {
		return ticketservice.addTicket(bookerId, ticket);
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
	@GetMapping("/getalldiscounts")
	List<Discounts> getalldiscounts(){
		return ddi.getDiscountsList();
	}
	@GetMapping("/getApplicableDiscounts/{totalamount}")
	List<Discounts> getApplicableDiscounts(@PathVariable double totalamount)
	{
		
		return ddi.getApplicableDiscounts(totalamount);
	}

	@PostMapping("/applyDiscount/{ticketId}")
	Double applyDisc(@PathVariable Long ticketId,@RequestBody DiscountRequest discountId)
	{
		return ddi.applyDiscount(ticketId,discountId.getDiscountId()); 
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
	@PostMapping("/confirmPayment/{ticketId}")
	String confirmPaymentMethod(@PathVariable Long ticketId,@RequestBody Payments payment)
	{
		ticketservice.confirmTicket(ticketId, payment);
		return "BOOKING CONFIRMED";
	}

	
	@PostMapping("/cancelPayment/{ticketId}")
	String cancelPaymentMethod(@PathVariable Long ticketId )
	{
		ticketservice.transactionFailed(ticketId);
		return "payment cancelled";
	}
	
	
//***************************************************************************

	//***************************************************************************

		//***************************************************************************
								//FEEDBACK RELATED ENDPOINTS//
		@PostMapping("/addFeedback")
		String addFeedback(@RequestParam String feedbackTitle,@RequestParam String feedbackBody )
		{
				ticketbookerservice.addFeedback(feedbackTitle, feedbackBody);
				
			return "feedback added";
		}
	
		
		//**********************************************************************
			         //KAFKA ENDPOINTS//
		@GetMapping("/kafkaMessage")
	    public ResponseEntity<String> getKafkaMessage() {
	        String message = ticketbookerservice.getKafkaMessage();
	        return new ResponseEntity<>(message != null ? message : "No message received", HttpStatus.OK);
	    }

}
