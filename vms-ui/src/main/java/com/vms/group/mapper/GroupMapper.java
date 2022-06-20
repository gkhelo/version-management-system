package com.vms.group.mapper;

import com.vms.group.dto.GroupDTO;
import com.vms.model.group.Group;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface GroupMapper {

	GroupDTO toDTO(Group group);

	Group fromDTO(GroupDTO dto);

	List<GroupDTO> toDTOs(List<Group> group);

	List<Group> fromDTOs(List<GroupDTO> dtos);
}
