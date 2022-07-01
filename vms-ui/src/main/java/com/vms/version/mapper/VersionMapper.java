package com.vms.version.mapper;

import com.vms.application.mapper.ApplicationMapper;
import com.vms.model.version.Version;
import com.vms.version.dto.VersionDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ApplicationMapper.class})
public interface VersionMapper {

	VersionDTO toDTO(Version version);

	Version fromDTO(VersionDTO dto);

	List<VersionDTO> toDTOs(List<Version> versions);

	List<Version> fromDTOs(List<VersionDTO> dtos);
}
