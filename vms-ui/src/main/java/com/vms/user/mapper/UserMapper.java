package com.vms.user.mapper;

import com.vms.company.CompanyService;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CompanyService.class})
public interface UserMapper {

	@Mapping(target = "companyId", source = "company", qualifiedByName = "companyToId")
	UserDTO toDTO(User user);

	@Mapping(target = "company", source = "companyId")
	User fromDTO(UserDTO dto);

	List<UserDTO> toDTOs(List<User> users);

	List<User> fromDTOs(List<UserDTO> dtos);

	@Named("companyToId")
	default long companyToId(Company company) {
		return company.getId();
	}
}