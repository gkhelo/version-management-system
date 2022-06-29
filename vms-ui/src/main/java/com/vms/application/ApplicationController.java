package com.vms.application;

import com.vms.application.dto.ApplicationDTO;
import com.vms.application.mapper.ApplicationMapper;
import com.vms.model.user.User;
import com.vms.security.AuthService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Applications")
@SecurityRequirement(name = "bearerAuth")
public class ApplicationController {

	@Autowired
	private AuthService authService;

	@Autowired
	private ApplicationService applicationService;

	@Autowired
	private ApplicationMapper applicationMapper;

	@Secured({"ADMIN", "USER"})
	@GetMapping("/all")
	public List<ApplicationDTO> getAllApplications() {
		return applicationMapper.toDTOs(applicationService.getApplications(authService.getAuthenticatedUser()));
	}

	@Secured({"ADMIN"})
	@PostMapping("/add")
	public ApplicationDTO addApplication(@RequestBody ApplicationDTO applicationDTO) {
		applicationDTO.setCompanyId(getCompanyId());
		return applicationMapper.toDTO(applicationService.addApplication(applicationMapper.fromDTO(applicationDTO), getCompanyId()));
	}

	@Secured({"ADMIN", "USER"})
	@PutMapping("/update")
	public ApplicationDTO updateApplication(@RequestBody ApplicationDTO applicationDTO) {
		applicationDTO.setCompanyId(getCompanyId());
		return applicationMapper.toDTO(applicationService.updateApplication(applicationMapper.fromDTO(applicationDTO), getCompanyId()));
	}

	@Secured({"ADMIN"})
	@PutMapping("/update/company-users")
	public ApplicationDTO updateCompanyUsers(@RequestParam long applicationId, @RequestBody List<Long> companyUserIds) {
		return applicationMapper.toDTO(applicationService.updateCompanyUsers(companyUserIds, applicationId, getCompanyId()));
	}

	@Secured({"ADMIN"})
	@PutMapping("/update/vendor-users")
	public ApplicationDTO updateVendorUsers(@RequestParam long applicationId, @RequestBody List<Long> vendorUserIds) {
		return applicationMapper.toDTO(applicationService.updateVendorUsers(vendorUserIds, applicationId, getCompanyId()));
	}

	private long getCompanyId() {
		User user = authService.getAuthenticatedUser();
		return user.getCompany().getId();
	}
}
