package com.vms.application;

import com.vms.application.dto.ApplicationDTO;
import com.vms.application.mapper.ApplicationMapper;
import com.vms.model.application.Application;
import com.vms.model.user.User;
import com.vms.security.AuthService;
import com.vms.user.mapper.UserMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

	@Autowired
	private UserMapper userMapper;

	@Secured({"ADMIN", "USER"})
	@GetMapping("/all")
	public Page<ApplicationDTO> getAllApplications(@RequestParam(defaultValue = "0") Integer page,
												   @RequestParam(defaultValue = "10") Integer size,
												   @RequestParam(defaultValue = "id") String sortBy,
												   @RequestParam(defaultValue = "asc") String sortDirection) {
		Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
		Page<Application> applicationsResult = applicationService.getApplications(authService.getAuthenticatedUser(), paging);
		return new PageImpl<>(applicationMapper.toDTOs(applicationsResult.getContent()), paging, applicationsResult.getTotalElements());

	}

	@Secured({"ADMIN", "USER"})
	@GetMapping("/get/{applicationId}")
	public ApplicationDTO getApplication(@PathVariable("applicationId") long applicationId) {
		return applicationMapper.toDTO(applicationService.getApplication(applicationId, authService.getAuthenticatedUser()));
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
	@DeleteMapping("/delete/{applicationId}")
	public ResponseEntity<?> deleteApplication(@PathVariable("applicationId") long applicationId) {
		applicationService.deleteApplication(applicationId, getCompanyId());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Secured({"ADMIN"})
	@PutMapping("/user/add")
	public ApplicationDTO addApplicationUser(@RequestParam long applicationId, @RequestParam long userId) {
		return applicationMapper.toDTO(applicationService.addApplicationUser(applicationId, userId, authService.getAuthenticatedUser()));
	}

	@Secured({"ADMIN"})
	@PutMapping("/user/delete")
	public ApplicationDTO deleteApplicationUser(@RequestParam long applicationId, @RequestParam long userId) {
		return applicationMapper.toDTO(applicationService.deleteApplicationUser(applicationId, userId, authService.getAuthenticatedUser()));
	}

	private long getCompanyId() {
		User user = authService.getAuthenticatedUser();
		return user.getCompany().getId();
	}
}
