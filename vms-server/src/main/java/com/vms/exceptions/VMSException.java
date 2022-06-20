package com.vms.exceptions;

import java.util.logging.Level;
import java.util.logging.Logger;

public class VMSException extends RuntimeException {

	private final static Logger LOGGER = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

	public VMSException(String message) {
		super(message);
		printStackTrace();
	}

	@Override
	public void printStackTrace() {
		LOGGER.log(Level.SEVERE, getMessage());
	}
}
