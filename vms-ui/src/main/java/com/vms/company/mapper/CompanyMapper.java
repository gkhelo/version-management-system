package com.vms.company.mapper;

import com.vms.company.dto.CompanyDTO;
import com.vms.model.company.Company;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CompanyMapper {

	CompanyDTO toDTO(Company company);

	Company fromDTO(CompanyDTO dto);

	List<CompanyDTO> toDTOs(List<Company> companies);

	List<Company> fromDTOs(List<CompanyDTO> dtos);
}
