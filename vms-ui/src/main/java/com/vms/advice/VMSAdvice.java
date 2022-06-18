package com.vms.advice;

import com.vms.exceptions.VMSException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class VMSAdvice {
	@ResponseBody
	@ExceptionHandler(value = {VMSException.class})
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public AdviceResponse VMSExceptionHandler(VMSException e) {
		AdviceResponse response = new AdviceResponse();
		response.setMessage(e.getMessage());
		return response;
	}

	@ResponseBody
	@ExceptionHandler(value = {EmptyResultDataAccessException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public AdviceResponse VMSExceptionHandler(EmptyResultDataAccessException e) {
		AdviceResponse response = new AdviceResponse();
		response.setMessage(e.getMessage());
		return response;
	}
}
