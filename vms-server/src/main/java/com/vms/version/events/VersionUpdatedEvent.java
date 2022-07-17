package com.vms.version.events;

import com.vms.model.application.Application;
import com.vms.model.version.Version;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Setter
@Getter
public class VersionUpdatedEvent extends ApplicationEvent {

	private Application application;

	private Version version;

	public VersionUpdatedEvent(Object source, Application application, Version  version) {
		super(source);
		this.application = application;
		this.version = version;
	}
}
