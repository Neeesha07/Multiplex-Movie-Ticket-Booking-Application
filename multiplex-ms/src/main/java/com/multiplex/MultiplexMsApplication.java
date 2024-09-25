package com.multiplex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.client.WebClient;


@SpringBootApplication(scanBasePackages="com.multiplex")
@ComponentScan("com")
@EnableJpaRepositories("com.multiplex.repo")
@EntityScan("com.multiplex.entity")
public class MultiplexMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MultiplexMsApplication.class, args);
	}
	@Bean("webclient")
	//@LoadBalanced
	public WebClient.Builder getWebClient()
	{
		return WebClient.builder();
	}

}
