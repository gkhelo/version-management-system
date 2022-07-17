package com.vms.email;

import com.vms.model.application.Application;
import com.vms.model.user.User;
import com.vms.version.events.VersionCreatedEvent;
import com.vms.version.events.VersionUpdatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

	@Value("${vms.gmail.username}")
	String username;

	@Autowired
	private JavaMailSender emailSender;

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	public void handle(VersionCreatedEvent event) {
		try {
			Application app = event.getApplication();
			String subject = String.format("Version created for application %s", app.getName());
			String message = String.format("Version %s created", event.getVersion().getDescription());
			for (User user : app.getUsers()) {
				sendSimpleMessage(user.getEmail(), subject, message);
			}
		} catch (Exception exception) {
			log.error(exception.getMessage(), exception);
		}
	}

	@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
	public void handle(VersionUpdatedEvent event) {
		try {
			Application app = event.getApplication();
			String subject = String.format("Version %s has been updated", event.getVersion().getDescription());
			String message = String.format("Version %s updated for application %s", event.getVersion().getDescription(), app.getVersion());
			for (User user : app.getUsers()) {
				sendSimpleMessage(user.getEmail(), subject, message);
			}
		} catch (Exception exception) {
			log.error(exception.getMessage(), exception);
		}
	}

	public void sendSimpleMessage(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(username);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		emailSender.send(message);
	}
}
