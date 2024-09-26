package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dao.TicketBookerDao;
import com.entity.TicketBooker;
import com.model.Feedback;
import com.repository.TicketBookerRepo;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class TicketBookerImpl implements TicketBookerDao {
	@Autowired
	private TicketBookerRepo ticketBookerrepo;
	
	@Autowired
	@Qualifier("webclient")
	WebClient.Builder builder;

	@Override
	@Transactional
	public void addBooker(TicketBooker booker) {
		// TODO Auto-generated method stub
		ticketBookerrepo.save(booker);
		
	}

	@Override
	@Transactional
	public TicketBooker getticketBooker(Long id) {
		// TODO Auto-generated method stub
		return ticketBookerrepo.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public void deleteBooker(Long id) {
		// TODO Auto-generated method stub
		ticketBookerrepo.deleteById(id);
		
	}

	@Override
	@Transactional
	public TicketBooker EditProfile(Long id, TicketBooker ticketbookerDetails) {
		// TODO Auto-generated method stub
		TicketBooker ticketBooker=getticketBooker(id);
		if(ticketBooker!=null) {
			ticketBooker.setBookerMail(ticketbookerDetails.getBookerMail());
			ticketBooker.setForeignUserId(ticketbookerDetails.getForeignUserId());
			ticketBooker.setBookerName(ticketbookerDetails.getBookerName());
			ticketBooker.setBookerContact(ticketbookerDetails.getBookerContact());
			ticketBooker.setBookerPassword(ticketbookerDetails.getBookerPassword());
			return ticketBookerrepo.save(ticketBooker);
		}
		return null;
		
	}

	@Override
	@Transactional
	public List<TicketBooker> getallticketBooker() {
		// TODO Auto-generated method stub
		
		return ticketBookerrepo.findAll();
	}
	@Override
	public TicketBooker getTicketBookerIdbyForeignUserId(Long foreignUserId) {
		// TODO Auto-generated method stub
		TicketBooker booker = ticketBookerrepo.findTicketBookerByForeignUserId(foreignUserId);
		return booker;
	}
	
	//***************************************************************************
	//Feedback
		public Feedback addFeedback(String title, String feedbackBody) {
			Feedback f = Feedback.builder().feedbackBody(feedbackBody).feedbackTitle(title).usertype("CUST").build();
			String feedbackURL = "http://localhost:8081/feedback/addFeedback";
			 Feedback f2= builder.build().post().uri(feedbackURL).bodyValue(f)
					.retrieve().bodyToMono(Feedback.class).block();
			 return f2;
			

		}
		//***************************************************************************
		//KAFKA
		
		@KafkaListener(topics = "announcement",groupId = "abc")
		public String kafkaListener(String data) {
			
			if(data.startsWith("CUST_")) {
				System.out.println(data.substring(5));
			}
			else if(data.startsWith("MOWNER_")) {
				System.out.println(data.substring(7));
			}
			else {
				System.out.println(data.substring(4));
			}
			return "commentAdded";
		}
		
}
