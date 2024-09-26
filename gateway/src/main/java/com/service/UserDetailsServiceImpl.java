package com.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.entity.Roles;
import com.entity.Users;
import com.repository.UserRepository;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class UserDetailsServiceImpl implements ReactiveUserDetailsService {

	@Autowired
	UserRepository userRepository;

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// System.out.println(username);
//		List<Users> userList = userRepository.findAll();
//		 System.out.println("USerlist "+userList);
//		Users user = null;
//		for (Users u : userList) {
//			if (u.getUsername().equals(username)) {
//				System.out.println("Inside loop uname "+username);
//			System.out.println(u);
//				user = u;
//			}
//
//		}
//		 Users user1 = userRepository.getUserByUsername(username);
//		if (user == null) {
//			 System.out.println("Its null");
//			throw new UsernameNotFoundException("Username not found exception");
//		}
//
//		 System.out.println("Outside Loop "+user1);
//		return new User(user.getUsername(), user.getPassword(), getAuthorities(user.getRoles()));
//	}

	private Set<GrantedAuthority> getAuthorities(Set<Roles> roles) {
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
	}

	

	    @Override
	    public Mono<UserDetails> findByUsername(String username) {
	     
	              return Mono.justOrEmpty(userRepository.getUserByUsername(username)) // Create a Mono from the result, handling null automatically
	            		  .switchIfEmpty(Mono.defer(() -> {
	            		        System.out.println("User not found: " + username);
	            		        return Mono.error(new UsernameNotFoundException("Username not found: " + username)); // Return an error to propagate failure
	            		    }))// Run a side effect (like logging) and return an empty Mono
	            		    .map(user -> {
	            		        System.out.println(user);
	            		        return mapUserToUserDetails(user); // Map the user to user details
	            		    });	   
		
	    }

	    private UserDetails mapUserToUserDetails(Users user) {
	        return new User(user.getUsername(), user.getPassword(), getAuthorities(user.getRoles()));
	    }

	    
	}


