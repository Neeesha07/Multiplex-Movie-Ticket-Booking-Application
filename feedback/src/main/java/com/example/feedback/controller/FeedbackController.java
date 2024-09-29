package com.example.feedback.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.feedback.entity.Feedback;
import com.example.feedback.service.FeedbackServiceInt;

//@CrossOrigin(origins="localhost:3000")
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

	@Autowired
	FeedbackServiceInt feedbackServiceInt;
	
	
	@Autowired
	private KafkaTemplate template;
	
	@PostMapping("addFeedback")
	public String addFeedback(@RequestBody Feedback feedback) {
		feedbackServiceInt.addFeedback(feedback);
		return "Feedback Added!!";
	}
	
	
	@PostMapping("/broadcast")
	public String broadcast(@RequestBody Feedback feedback) {
		template.send("multiplex",feedback.getFeedbackBody());
		template.send("ticketbooker",feedback.getFeedbackBody());
		return "Message Broadcasted!!";
	}
	
	@GetMapping("feedbacks")
	public List<Feedback> getFeedbacks(){
		return feedbackServiceInt.getAllFeedback();
	}
	@GetMapping("feedbackByUser/{userType}")
	public List<Feedback> getFeedbacksByUser(@PathVariable String userType){
		return feedbackServiceInt.getFeedbackByUserType(userType);
	}
	
	@PostMapping("announcement")
	public String announcement(@RequestParam String announcement) {
		feedbackServiceInt.sendAnnouncements(announcement);
		return "Announced!!";
	}
}
