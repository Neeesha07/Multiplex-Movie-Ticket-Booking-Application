package com.service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.entity.Roles;
import com.entity.Users;
import com.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println(username);
		List<Users> userList=userRepository.findAll();
		System.out.println(userList);
		Users user = null;
		for(Users u:userList) {
			if(u.getUsername().equals(username)) {
//				System.out.println(username);
//				System.out.println(u);
				user=u;
			}
			
		}
		//Users user = userRepository.getUserByUsername(username);
		if(user==null) {
			System.out.println("Its null");
			throw new UsernameNotFoundException("Username not found exception");
		}
		System.out.println(user);
		return new User(user.getUsername(), user.getPassword(),getAuthorities(user.getRoles()));
	}
	private Set<GrantedAuthority> getAuthorities(Set<Roles> roles) {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toSet());
    }

}
