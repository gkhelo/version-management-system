package com.vms.user.mapper;

import com.vms.model.user.User;
import com.vms.user.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);

    User fromDTO(UserDTO dto);

    List<UserDTO> toDTOs(List<User> users);

    List<User> fromDTOs(List<UserDTO> dtos);
}