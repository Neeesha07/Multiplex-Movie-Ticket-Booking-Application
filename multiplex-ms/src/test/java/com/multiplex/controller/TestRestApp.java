package com.multiplex.controller;


import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


import org.assertj.core.util.Arrays;
import org.hamcrest.Matcher;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.multiplex.controller.RestApp;
import com.multiplex.entity.Movie;
import com.multiplex.entity.Multiplex;
import com.multiplex.model.HighestGrossingResponse;
import com.multiplex.model.PriceResponse;
import com.multiplex.model.Seats;
import com.multiplex.model.TicketTypePriceRequest;
import com.multiplex.service.MultiplexDao2;
import com.multiplex.service.MultiplexService;


//@ExtendWith(SpringExtension.class)
//@WebMvcTest(RestApp.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TestRestApp{
	@MockBean
	MultiplexService service;
	
	@MockBean
	MultiplexDao2 dao2;
	
	@Autowired
	MockMvc mockMvc;
	
	@Test
	public void testAddOwner() throws Exception{
		
		
		String jsonContent = "{"
                + "\"multiplexOwnerName\":\"karthik\","
                + "\"multiplexOwnerMail\":\"raj@raj.com\","
                + "\"multiplexOwnerPassword\":\"123\""
                + "}";
		
		
		 mockMvc.perform(MockMvcRequestBuilders.post("/multiplex/addowner")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(jsonContent))
	                .andExpect(MockMvcResultMatchers.status().isOk())
	                .andExpect(MockMvcResultMatchers.content().string("Owner Added"));
		
	}
	
	
	@Test
	public void testAddMultiplexToOwner() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "    \"multiplexName\":\"Max\",\r\n"
	    		+ "    \"multiplexLocation\":\"Bangalore\",\r\n"
	    		+ "    \"numberOfScreens\":\"12\",\r\n"
	    		+ "    \"seatTypeConfig\":{\r\n"
	    		+ "        \"silver\":{\r\n"
	    		+ "            \"beginning\":10,\r\n"
	    		+ "            \"ending\":20\r\n"
	    		+ "        },\r\n"
	    		+ "        \"gold\":{\r\n"
	    		+ "           \"beginning\":21,\r\n"
	    		+ "            \"ending\":30\r\n"
	    		+ "        }\r\n"
	    		+ "    },\r\n"
	    		+ "    \"ticketTypePrice\":{\r\n"
	    		+ "        \"silver\":100,\r\n"
	    		+ "        \"gold\":300,\r\n"
	    		+ "        \"premium\":500\r\n"
	    		+ "    }\r\n"
	    		+ "\r\n"
	    		+ "}";
	    
	    mockMvc.perform(MockMvcRequestBuilders.post("/multiplex/addmultiplex/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("Multiplex Added"));

	}

	@Test
	public void testAddMovieToMultiplex() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "    \"movieName\":\"Deadpool and wovlerine and someone\",\r\n"
	    		+ "    \"movieRating\":\"R\",\r\n"
	    		+ "    \"movieGenre\":\"Action\"\r\n"
	    		+ "}";
	    
	    mockMvc.perform(MockMvcRequestBuilders.post("/multiplex/addmovie/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("Movie Added to multiplex"));

//	    verify(service, times(1)).addMovieToMultiplex(any(Movie.class), eq(1L));
	}

	@Test
	public void testAddScreeningToMovie() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "    \"timeSlot\":\"2024-09-22T08:30:00.000000\"\r\n"
	    		+ "}";
	    
	    mockMvc.perform(MockMvcRequestBuilders.post("/multiplex/addscreening/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("Screening Added to movie"));

	}

	
	@Test 
	public void testGetAllMoviesByOwnerId() throws Exception 
	{ 
		List<Movie> movies = new ArrayList<Movie>();
		Movie movie1 = new Movie("Drive", "Vibes", "pg16", "abc","https://image1.com","2hr 32 mins");
		Movie movie2 = new Movie("Transformers", "Action", "pg16", "qwp","https://image2.com","1hr 55 mins");
		movies.add(movie1);
		movies.add(movie2);
		Mockito.when(service.getAllMoviesByOwnerId((long) 1)).thenReturn(movies);

		mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getallmoviesbyownerid/1"))
		.andExpect(MockMvcResultMatchers.status().isOk()) 
		.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

		Mockito.verify(service, Mockito.times(1)).getAllMoviesByOwnerId(1L); 
	}

	@Test
	public void testUpdateMovieDetails() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "    \"movieName\":\"Deadpool & Wovlerine\",\r\n"
	    		+ "    \"movieRating\":\"PG16\",\r\n"
	    		+ "    \"movieGenre\":\"Action\"\r\n"
	    		+ "}";

	    mockMvc.perform(MockMvcRequestBuilders.put("/multiplex/updatemoviedetails/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("Movie Details Updated"));

	    Mockito.verify(service, Mockito.times(1)).updateMovieDetails(Mockito.eq(1L), Mockito.any(Movie.class));
	}

	@Test
	public void testDeleteMovie() throws Exception {
	    Mockito.when(service.deleteMovieFromMultiplex(1L)).thenReturn(true);

	    mockMvc.perform(MockMvcRequestBuilders.delete("/multiplex/deletemovie/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("Movie Deleted"));

	    Mockito.verify(service, Mockito.times(1)).deleteMovieFromMultiplex(1L);
	}

	@Test
	public void testUpdateTicketTypePrice() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "     \"ticketTypePrice\":{\r\n"
	    		+ "        \"silver\":100,\r\n"
	    		+ "        \"gold\":300,\r\n"
	    		+ "        \"premium\":500\r\n"
	    		+ "     }\r\n"
	    		+ "}";

	    mockMvc.perform(MockMvcRequestBuilders.put("/multiplex/updatetickettypeprice/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("updated"));

	    Mockito.verify(service, Mockito.times(1)).updateTicketTypePrice(Mockito.eq(1L), Mockito.any(TicketTypePriceRequest.class));
	}

	@Test
	public void testBookSeats() throws Exception {
	    String jsonContent = "{\r\n"
	    		+ "    \"bookedSeats\":[1,2,3,45]\r\n"
	    		+ "}";

	    mockMvc.perform(MockMvcRequestBuilders.put("/multiplex/bookseats/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(jsonContent))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("updated"));

//	    Mockito.verify(service, Mockito.times(1)).bookSeats(Mockito.eq(1L), Mockito.any(Seats.class));
	}

	@Test
	public void testGetTicketsSoldDailyForAllMultiplexes() throws Exception {
	    Mockito.when(service.getTicketsSoldDailyForAllMultiplexes(1L)).thenReturn(10);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getticketssolddaily/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("10"));

	    Mockito.verify(service, Mockito.times(1)).getTicketsSoldDailyForAllMultiplexes(1L);
	}
	
	
	
	
	
//	Multiplex Dao -

	@Test
	public void testGetMoviesFromMultiplex() throws Exception {
	    List<Movie> movies = new ArrayList<Movie>();
		Movie movie1 = new Movie("Drive", "Vibes", "pg16","abc","https://image1.com","2hr 32 mins");
		Movie movie2 = new Movie("Transformers", "Action","pg16", "qwp","https://image2.com","1hr 55 mins");
		movies.add(movie1);
		movies.add(movie2);
	    
	    
	    Mockito.when(dao2.getMovieFromMultiplex(1L)).thenReturn(movies);
	    
	    
	    

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getMovies/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

	    Mockito.verify(dao2, Mockito.times(1)).getMovieFromMultiplex(1L);
	}


	@Test
	public void testDeleteMultiplex() throws Exception {
	    Mockito.doNothing().when(dao2).deleteMultiplex(1L);

	    mockMvc.perform(MockMvcRequestBuilders.delete("/multiplex/delelteMultiplex/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk());

	    Mockito.verify(dao2, Mockito.times(1)).deleteMultiplex(1L);
	}
	
	
	
	
	
//	
//	
	
	@Test
	public void testGetMultiplexFromOwner() throws Exception {
	    List<Multiplex> multiplexes = new ArrayList<Multiplex>();
	    List<LocalTime> timeslots = new ArrayList<LocalTime>();
	    LocalTime timeSlot = LocalTime.parse("11:30:00");
	    timeslots.add(timeSlot);
	    timeslots.add(timeSlot);
	    		
	    Multiplex multiplex1 = new Multiplex("Inox", "Chennai", 12, timeslots);
	    Multiplex multiplex2 = new Multiplex("Inox", "Chennai", 12, timeslots);
	    multiplexes.add(multiplex1);
	    multiplexes.add(multiplex2);
	    
	    Mockito.when(dao2.getMultiplexFromOwner(1L)).thenReturn(multiplexes);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getMultiplex/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

	    Mockito.verify(dao2, Mockito.times(1)).getMultiplexFromOwner(1L);
	}

	@Test
	public void testGetTimeSlotFromMovie() throws Exception {
		
		
	    List<LocalDateTime> timeSlots = new ArrayList<LocalDateTime>();
	    timeSlots.add(LocalDateTime.now());
	    timeSlots.add(LocalDateTime.now().plusHours(1));
	    Mockito.when(dao2.getTimeSlotFromMovie(1L)).thenReturn(timeSlots);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getTimeSlotForMovie/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

	    Mockito.verify(dao2, Mockito.times(1)).getTimeSlotFromMovie(1L);
	}

	@Test
	public void testDeleteTimeSlot() throws Exception {
	    Mockito.doNothing().when(dao2).deleteTimeSlot(1L);

	    mockMvc.perform(MockMvcRequestBuilders.delete("/multiplex/delelteTimeSlot/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk());

	    Mockito.verify(dao2, Mockito.times(1)).deleteTimeSlot(1L);
	}

	@Test
	public void testGetPriceForSelectedSeat() throws Exception {
	    PriceResponse priceResponse = new PriceResponse(50,"Silver",100);
	    Mockito.when(dao2.getPriceForSelectedSeat(1L, 5)).thenReturn(priceResponse);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getPrice/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("5"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$.price", Matchers.is(50)));

	    Mockito.verify(dao2, Mockito.times(1)).getPriceForSelectedSeat(1L, 5);
	}

	@Test
	public void testGetPriceForSelectedSeats() throws Exception {
	    List<PriceResponse> priceResponses = new ArrayList<PriceResponse>();
	    priceResponses.add(new PriceResponse(50,"Silver",100));
	    priceResponses.add(new PriceResponse(60,"Silver",200));
	    		
	    Mockito.when(dao2.getPriceForSelectedSeats(Mockito.eq(1L), Mockito.anyList())).thenReturn(priceResponses);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getPrices/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("[5, 6]"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)))
	            .andExpect(MockMvcResultMatchers.jsonPath("$[0].price", Matchers.is(50)))
	            .andExpect(MockMvcResultMatchers.jsonPath("$[1].price", Matchers.is(60)));

	    Mockito.verify(dao2, Mockito.times(1)).getPriceForSelectedSeats(Mockito.eq(1L), Mockito.anyList());
	}

	@Test
	public void testGetHighestGrossingMovie() throws Exception {
	    HighestGrossingResponse response = new HighestGrossingResponse("Movie Title", 10000);
	    Mockito.when(dao2.getHighestGrossingMovie(1L)).thenReturn(response);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getHighestGrossing/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$.movieTitle", Matchers.is("Movie Title")))
	            .andExpect(MockMvcResultMatchers.jsonPath("$.grossRevenue", Matchers.is(10000)));

	    Mockito.verify(dao2, Mockito.times(1)).getHighestGrossingMovie(1L);
	}

	@Test
	public void testCalculateScreeningRevenue() throws Exception {
	    Mockito.when(dao2.calculateScreeningRevenue(1L)).thenReturn(5000);

	    mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/perScreenRevenue/1"))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.content().string("5000"));

	    Mockito.verify(dao2, Mockito.times(1)).calculateScreeningRevenue(1L);
	}

	@Test
	public void testAddTimeslot() throws Exception {
	    List<LocalTime> updatedTimeSlots = new ArrayList<LocalTime>();
	    updatedTimeSlots.add(LocalTime.of(10, 0));
	    updatedTimeSlots.add(LocalTime.of(12, 0));
	    Mockito.when(service.addTimeslot(Mockito.eq(1L), Mockito.any(LocalTime.class))).thenReturn(updatedTimeSlots);

	    mockMvc.perform(MockMvcRequestBuilders.put("/multiplex/addtimeslot/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("\"10:00:00\""))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)))
	            .andExpect(MockMvcResultMatchers.jsonPath("$[0]", Matchers.is("10:00:00")))
	            .andExpect(MockMvcResultMatchers.jsonPath("$[1]", Matchers.is("12:00:00")));

	    Mockito.verify(service, Mockito.times(1)).addTimeslot(Mockito.eq(1L), Mockito.any(LocalTime.class));
	}

	@Test
	public void testDeleteTimeslot() throws Exception {
	    List<LocalTime> updatedTimeSlots = new ArrayList<LocalTime>();
	    updatedTimeSlots.add(LocalTime.of(10, 0));
//	    updatedTimeSlots.add(LocalTime.of(12, 0));
	    
	    Mockito.when(service.deleteTimeslot(Mockito.eq(1L), Mockito.any(LocalTime.class))).thenReturn(updatedTimeSlots);

	    mockMvc.perform(MockMvcRequestBuilders.delete("/multiplex/deletetimeslot/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("\"10:00:00\""))
	            .andExpect(MockMvcResultMatchers.status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(1)))
	            .andExpect(MockMvcResultMatchers.jsonPath("$[0]", Matchers.is("12:00:00")));

	    Mockito.verify(service, Mockito.times(1)).deleteTimeslot(Mockito.eq(1L), Mockito.any(LocalTime.class));
	}

	
	


	
	
}