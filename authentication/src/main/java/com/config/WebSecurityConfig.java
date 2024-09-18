package com.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.service.UserDetailsServiceImpl;
import com.utils.CustomAuthenticationHandler;
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

	@Autowired
	public CustomAuthenticationHandler authenticationHandler;

	@Autowired
	public UserDetailsServiceImpl detailsServiceImpl;
	

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(detailsServiceImpl).passwordEncoder(bCryptPasswordEncoder());
	}

//	@Bean
//	public DaoAuthenticationProvider authenticationProvider() {
//		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//		authenticationProvider.setUserDetailsService(userDetailsService());
//		authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
//		return authenticationProvider;
//	}

	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(auth -> 
			auth.requestMatchers("/customerHome").hasAuthority("CUST")
				.requestMatchers("/mulOwnerHome").hasAuthority("MULOWNER")
				.requestMatchers("/adminHome").hasAuthority("ADMIN").anyRequest().authenticated())
				.formLogin(formLogin -> formLogin.successHandler(authenticationHandler))
				.logout(logout -> logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout")))
				.exceptionHandling(eh -> eh.accessDeniedPage("/ad"))
				.csrf(csrf->csrf.disable());
		return http.build();
	}
}
