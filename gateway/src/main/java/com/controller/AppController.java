package com.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Roles;
import com.entity.Users;
import com.repository.UserRepository;

import reactor.core.publisher.Mono;
@CrossOrigin(origins="*")
@RestController
public class AppController {
@Autowired
UserRepository userRepository;
@Autowired
BCryptPasswordEncoder bCryptPasswordEncoder;
	@PostMapping("/registerUser")
	public Users registerUser(@RequestParam String username,@RequestParam String password,@RequestParam String role) {
		Set<Roles> roles= new HashSet<Roles>();
		roles.add(Roles.builder().name(role).build());
		Users u =Users.builder().username(username).password(bCryptPasswordEncoder.encode(password)).roles(roles).build();
		
		userRepository.save(u);
		return u;
		
	}
	
	@GetMapping("/userByUsername")
	public Users getuserbyusername(@RequestParam String username) {
		return userRepository.getUserByUsername(username);
	}
//	
//	@GetMapping("/customerHome")
//	public String emp() {
//		return "customerHome";
//	}
//	
//	@GetMapping("/ad")
//	public String ad() {
//		return "ad";
//	}
//	@GetMapping("/default")
//	public String home() {
//		return "default";
//	}
//	
//	@GetMapping("/mulOwnerHome")
//	public String manager() {
//		return "mulOwnerHome";
//	}

}
