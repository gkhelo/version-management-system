package com.vms.company.dto;

import com.vms.configurable.dto.ConfigurableDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyDTO extends ConfigurableDTO {

	private String name;

	private String email;
}
