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
		Mono<Void> asyncTask = Mono.fromRunnable(() -> {
            // Example async work (e.g., log successful login or publish an event)
            System.out.println("User " + authentication.getName() + " logged in successfully.");
            // Simulate asynchronous task
        });

        // Ensure that the async task completes before setting the response
        return asyncTask.then(Mono.defer(() -> {
            // Set response status to 200 OK after async task completes
            webFilterExchange.getExchange().getResponse().setStatusCode(HttpStatus.OK);
            return Mono.empty();
        }));
	}
}

	


