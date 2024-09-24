package com.multiplex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@ComponentScan("com")
@EnableJpaRepositories("com.multiplex.repo")
@EntityScan("com.multiplex.entity")
@EnableScheduling
public class MultiplexMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MultiplexMsApplication.class, args);
	}

}
