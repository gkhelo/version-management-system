package com.vms.user.dto;

import com.vms.configurable.dto.ConfigurableDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends ConfigurableDTO {

    private String username;

    private String firstname;

    private String lastname;

    private String email;

    private boolean passwordChangeRequired;

    private RoleDTO role;
}