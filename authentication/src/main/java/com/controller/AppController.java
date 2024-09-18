package com.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {

	
	@GetMapping("/adminHome")
	public String admin() {
		return "adminHome";
	}
	
	@GetMapping("/customerHome")
	public String emp() {
		return "customerHome";
	}
	
	@GetMapping("/ad")
	public String ad() {
		return "ad";
	}
	@GetMapping("/default")
	public String home() {
		return "default";
	}
	
	@GetMapping("/mulOwnerHome")
	public String manager() {
		return "mulOwnerHome";
	}

}
