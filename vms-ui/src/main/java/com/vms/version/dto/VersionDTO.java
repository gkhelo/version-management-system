package com.vms.version.dto;

import com.vms.application.dto.ApplicationDTO;
import com.vms.configurable.dto.ConfigurableDTO;
import com.vms.model.version.VersionStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VersionDTO extends ConfigurableDTO {

	private String description;

	private ApplicationDTO application;

	private List<String> filenames;

	private String readme;

	private VersionStatus status;
}
