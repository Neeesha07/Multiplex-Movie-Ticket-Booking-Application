package com.utils;

import java.io.IOException;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class CustomAuthenticationHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		Set<String> roles=AuthorityUtils.authorityListToSet(authentication.getAuthorities());
		if(roles.contains("ADMIN")) {
			response.sendRedirect("adminHome");
		}
		else if(roles.contains("MULOWNER")) {
			response.sendRedirect("/mulOwnerHome");
		}
		else if(roles.contains("CUST")) {
			response.sendRedirect("/customerHome");
		}
		else {
			response.sendRedirect("/default");
		}
		

	}

}
