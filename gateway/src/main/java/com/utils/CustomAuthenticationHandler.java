package com.utils;

import java.net.URI;
import java.util.Set;

import javax.naming.AuthenticationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;
@Component
public class CustomAuthenticationHandler implements ServerAuthenticationSuccessHandler {


	@Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
		

		 webFilterExchange.getExchange().getResponse().setStatusCode(HttpStatus.OK);
	        
	        return Mono.empty();  // Always succeed without further checks
        
	}
}

	


