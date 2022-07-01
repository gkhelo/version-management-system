package com.vms.application.mapper;

import com.vms.application.ApplicationService;
import com.vms.application.dto.ApplicationDTO;
import com.vms.company.CompanyService;
import com.vms.model.application.Application;
import com.vms.model.company.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ApplicationService.class, CompanyService.class})
public interface ApplicationMapper {

	@Mappings({
		@Mapping(target = "companyId", source = "company", qualifiedByName = "companyToId"),
		@Mapping(target = "vendorId", source = "vendor", qualifiedByName = "companyToId"),
		@Mapping(target = "companyName", source = "company", qualifiedByName = "companyToName"),
		@Mapping(target = "vendorName", source = "vendor", qualifiedByName = "companyToName"),
	})
	ApplicationDTO toDTO(Application application);

	@Mappings({
		@Mapping(target = "company", source = "companyId"),
		@Mapping(target = "vendor", source = "vendorId"),
	})
	Application fromDTO(ApplicationDTO dto);

	List<ApplicationDTO> toDTOs(List<Application> applications);

	List<Application> fromDTOs(List<ApplicationDTO> dtos);

	@Named("companyToId")
	default Long companyToId(Company company) {
		return company.getId();
	}

	@Named("companyToName")
	default String companyToName(Company company) {
		return company.getName();
	}
}
