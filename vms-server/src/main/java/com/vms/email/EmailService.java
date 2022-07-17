package com.vms.email;

public interface EmailService {

	void sendSimpleMessage(String to, String subject, String text);
}
