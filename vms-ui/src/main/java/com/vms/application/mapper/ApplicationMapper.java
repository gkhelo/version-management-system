package com.vms.application.mapper;

import com.vms.application.ApplicationService;
import com.vms.application.dto.ApplicationDTO;
import com.vms.company.CompanyService;
import com.vms.model.application.Application;
import com.vms.model.company.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ApplicationService.class, CompanyService.class})
public interface ApplicationMapper {

	@Mapping(target = "companyId", source = "company", qualifiedByName = "companyToId")
	@Mapping(target = "vendorId", source = "vendor", qualifiedByName = "companyToId")
	ApplicationDTO toDTO(Application application);

	@Mapping(target = "company", source = "companyId")
	@Mapping(target = "vendor", source = "vendorId")
	Application fromDTO(ApplicationDTO dto);

	List<ApplicationDTO> toDTOs(List<Application> applications);

	List<Application> fromDTOs(List<ApplicationDTO> dtos);

	@Named("companyToId")
	default long companyToId(Company company) {
		return company.getId();
	}
}
