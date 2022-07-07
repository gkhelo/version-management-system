package com.vms.user.mapper;

import com.vms.company.CompanyService;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CompanyService.class})
public abstract class UserMapper {

	@Autowired
	private CompanyService companyService;

	@Mapping(target = "companyId", source = "company", qualifiedByName = "companyToId")
	@Mapping(target = "password", ignore = true)
	public abstract UserDTO toDTO(User user);

	@Mapping(target = "company", source = "companyId", qualifiedByName = "idToCompany")
	public abstract User fromDTO(UserDTO dto);

	public abstract List<UserDTO> toDTOs(List<User> users);

	public abstract List<User> fromDTOs(List<UserDTO> dtos);

	@Named("companyToId")
	long companyToId(Company company) {
		return company.getId();
	}

	@Named("idToCompany")
	Company idToCompany(long companyId) {
		return companyId == 0 ? null : companyService.findById(companyId);
	}
}
