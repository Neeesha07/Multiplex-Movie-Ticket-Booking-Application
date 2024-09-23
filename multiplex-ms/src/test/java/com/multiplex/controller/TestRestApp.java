package com.multiplex.controller;


import static org.mockito.Mockito.when;

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
import com.multiplex.service.MultiplexService;


//@ExtendWith(SpringExtension.class)
//@WebMvcTest(RestApp.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TestRestApp{
	@MockBean
	MultiplexService service;
	
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

	
	@Test public void testGetAllMoviesByOwnerId() throws Exception 
	{ 
		List<Movie> movies = new ArrayList<Movie>();
		Movie movie1 = new Movie("Drive", "Vibes", "pg16");
		Movie movie2 = new Movie("Transformers", "Action", "pg16");
		Mockito.when(service.getAllMoviesByOwnerId(1L)).thenReturn(movies);

		mockMvc.perform(MockMvcRequestBuilders.get("/multiplex/getallmoviesbyownerid/1"))
		.andExpect(MockMvcResultMatchers.status().isOk()) 
		.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

//		Mockito.verify(service, Mockito.times(1)).getAllMoviesByOwnerId(1L); 
	}
/*
 * @Test public void testUpdateMovieDetails() throws Exception { String
 * jsonContent = "{" + "\"movieTitle\":\"Updated Movie Title\"," +
 * "\"duration\":\"130\"," + "\"genre\":\"Comedy\"" + "}";
 * 
 * mockMvc.perform(put("/multiplex/updatemoviedetails/1")
 * .contentType(MediaType.APPLICATION_JSON) .content(jsonContent))
 * .andExpect(status().isOk())
 * .andExpect(content().string("Movie Details Updated"));
 * 
 * verify(service, times(1)).updateMovieDetails(eq(1L), any(Movie.class)); }
 * 
 * @Test public void testDeleteMovie() throws Exception {
 * when(service.deleteMovieFromMultiplex(1L)).thenReturn(true);
 * 
 * mockMvc.perform(delete("/multiplex/deletemovie/1"))
 * .andExpect(status().isOk()) .andExpect(content().string("Movie Deleted"));
 * 
 * verify(service, times(1)).deleteMovieFromMultiplex(1L); }
 * 
 * @Test public void testUpdateTicketTypePrice() throws Exception { String
 * jsonContent = "{" + "\"ticketType\":\"Standard\"," + "\"price\":10.0" + "}";
 * 
 * mockMvc.perform(put("/multiplex/updatetickettypeprice/1")
 * .contentType(MediaType.APPLICATION_JSON) .content(jsonContent))
 * .andExpect(status().isOk()) .andExpect(content().string("updated"));
 * 
 * verify(service, times(1)).updateTicketTypePrice(eq(1L),
 * any(TicketTypePriceRequest.class)); }
 * 
 * @Test public void testBookSeats() throws Exception { String jsonContent = "{"
 * + "\"seats\":[\"A1\", \"A2\"]" + "}";
 * 
 * mockMvc.perform(put("/multiplex/bookseats/1")
 * .contentType(MediaType.APPLICATION_JSON) .content(jsonContent))
 * .andExpect(status().isOk()) .andExpect(content().string("updated"));
 * 
 * verify(service, times(1)).bookSeats(eq(1L), any(Seats.class)); }
 * 
 * @Test public void testGetTicketsSoldDailyForAllMultiplexes() throws Exception
 * { when(service.getTicketsSoldDailyForAllMultiplexes(1L)).thenReturn(10);
 * 
 * mockMvc.perform(get("/multiplex/getticketssolddaily/1"))
 * .andExpect(status().isOk()) .andExpect(content().string("10"));
 * 
 * verify(service, times(1)).getTicketsSoldDailyForAllMultiplexes(1L); }
 * 
 * @Test public void testGetMoviesFromMultiplex() throws Exception { List<Movie>
 * movies = Arrays.asList(new Movie(), new Movie());
 * when(dao2.getMovieFromMultiplex(1L)).thenReturn(movies);
 * 
 * mockMvc.perform(get("/multiplex/getMovies/1")) .andExpect(status().isOk())
 * .andExpect(jsonPath("$", hasSize(2)));
 * 
 * verify(dao2, times(1)).getMovieFromMultiplex(1L); }
 * 
 * @Test public void testDeleteMultiplex() throws Exception {
 * doNothing().when(dao2).deleteMultiplex(1L);
 * 
 * mockMvc.perform(delete("/multiplex/delelteMultiplex/1"))
 * .andExpect(status().isOk());
 * 
 * verify(dao2, times(1)).deleteMultiplex(1L); }
 */

	
	
}