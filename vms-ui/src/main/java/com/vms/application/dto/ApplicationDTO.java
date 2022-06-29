package com.vms.application.dto;

import com.vms.configurable.dto.ConfigurableDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationDTO extends ConfigurableDTO {

	private String name;

	private Long companyId;

	private Long vendorId;
}
