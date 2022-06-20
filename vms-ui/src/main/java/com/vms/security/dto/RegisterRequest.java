package com.vms.security.dto;

import com.vms.company.dto.CompanyDTO;
import com.vms.user.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private CompanyDTO company;

    private UserDTO admin;
}