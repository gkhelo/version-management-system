package com.vms.company;

import com.vms.company.dto.CompanyDTO;
import com.vms.company.mapper.CompanyMapper;
import com.vms.model.user.User;
import com.vms.security.AuthService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@Secured("ADMIN")
@Tag(name = "Clients")
@SecurityRequirement(name = "bearerAuth")
public class ClientController {

	@Autowired
	private AuthService authService;

	@Autowired
	private ClientService clientService;

	@Autowired
	private CompanyMapper companyMapper;

	@GetMapping("/all")
	public List<CompanyDTO> getClients() {
		return companyMapper.toDTOs(clientService.getClients(getCompanyId()));
	}

	private long getCompanyId() {
		User user = authService.getAuthenticatedUser();
		return user.getCompany().getId();
	}
}
