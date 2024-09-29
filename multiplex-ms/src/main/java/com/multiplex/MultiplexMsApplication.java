package com.multiplex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@ComponentScan("com")
@EnableJpaRepositories("com.multiplex.repo")
@EntityScan("com.multiplex.entity")
@EnableScheduling
@EnableDiscoveryClient
@EnableKafka
@RefreshScope
public class MultiplexMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MultiplexMsApplication.class, args);
	}
	
	@Bean("webclient")
	public WebClient.Builder getWebClient()
	{
		return WebClient.builder();
	}
}
