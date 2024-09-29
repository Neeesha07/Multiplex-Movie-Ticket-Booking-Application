package com.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.service.UserDetailsServiceImpl;

@EnableWebFluxSecurity
@Configuration
public class WebSecurityConfig {

	@Autowired
	public ServerAuthenticationSuccessHandler authenticationHandler;

	@Autowired
	public UserDetailsServiceImpl detailsServiceImpl;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(detailsServiceImpl).passwordEncoder(bCryptPasswordEncoder());
//	}

	@Bean
	public SecurityWebFilterChain configure(ServerHttpSecurity http) throws Exception {
		http.authorizeExchange(auth -> 
			auth.pathMatchers("/ticketBooker/**").permitAll()    //hasAuthority("CUST")
				.pathMatchers("/multiplex-ms/**").permitAll()      // hasAuthority("MULOWNER")
				.pathMatchers("/registerUser/**").permitAll()
				.pathMatchers("/login/**").permitAll()
				.pathMatchers("/loginUser/**").permitAll()
				.pathMatchers("/feedback/**").permitAll() ) //hasAuthority("ADMIN").anyExchange().authenticated())
				.formLogin(formLogin -> formLogin.authenticationSuccessHandler(authenticationHandler))
				.logout(logout -> logout.logoutUrl("/logout"))
				.csrf(csrf->csrf.disable())
				.exceptionHandling(eh -> eh
			            // Handle access denied (403 Forbidden)
			            .accessDeniedHandler((exchange, denied) -> {
			                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
			                return exchange.getResponse().setComplete();
			            })
			            // Handle authentication failure (401 Unauthorized)
			            .authenticationEntryPoint((exchange, ex) -> {
			            	System.out.println("Unauthorized");
			                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
			                return exchange.getResponse().setComplete();
			            })
			        );
				
				
		
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
		configuration.setAllowedMethods(Collections.singletonList("*"));
		configuration.setAllowedHeaders(Collections.singletonList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public ReactiveAuthenticationManager reactiveAuthenticationManager() {
		UserDetailsRepositoryReactiveAuthenticationManager authenticationManager = new UserDetailsRepositoryReactiveAuthenticationManager(
				(ReactiveUserDetailsService) detailsServiceImpl);
		
		authenticationManager.setPasswordEncoder(bCryptPasswordEncoder());
		return authenticationManager;
	}
//        return authentication -> {
//            String username = authentication.getName();
//            String password = authentication.getCredentials().toString();
//
//            return Mono.just(detailsServiceImpl.loadUserByUsername(username))
//                .filter(userDetails -> bCryptPasswordEncoder().matches(password, userDetails.getPassword()))
//                .map(userDetails -> new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities()))
//                .cast(Authentication.class) 
//                .switchIfEmpty(Mono.error(new UsernameNotFoundException("User not found or invalid password")));
//        };
//    }
}
