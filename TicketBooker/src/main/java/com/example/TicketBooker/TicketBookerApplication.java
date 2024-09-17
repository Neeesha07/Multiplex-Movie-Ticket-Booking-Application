package com.example.TicketBooker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com")
@EnableJpaRepositories("com")
@ComponentScan("com")
public class TicketBookerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketBookerApplication.class, args);
	}

}
