package com.exception;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

//@ControllerAdvice
public class CustomExceptionHandler {
	@ExceptionHandler(SQLException.class)
	public ResponseEntity<Object> handleHeaderException(Exception ex,WebRequest request){
		List<String> details= new ArrayList<String>();
		details.add(ex.getLocalizedMessage());
		ErrorResponse errorResponse = new ErrorResponse("OOPS...Header missing..!",details);
		return new ResponseEntity(errorResponse,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> genericHeaderException(Exception ex,WebRequest request){
		List<String> details= new ArrayList<String>();
		details.add(ex.getLocalizedMessage());
		ErrorResponse errorResponse = new ErrorResponse("server side error caught..!",details);
		return new ResponseEntity(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
	}
		
	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<Object> userNotFoundException(RecordNotFoundException ex,WebRequest request){
		List<String> details = new ArrayList<String>();
        details.add(ex.getLocalizedMessage());
        ErrorResponse error = new ErrorResponse("INCORRECT_REQUEST", details);
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);

	}
}
