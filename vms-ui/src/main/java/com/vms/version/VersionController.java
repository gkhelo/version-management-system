package com.vms.version;

import com.vms.model.version.Version;
import com.vms.security.AuthService;
import com.vms.version.dto.VersionDTO;
import com.vms.version.mapper.VersionMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/versions")
@Secured("USER")
@Tag(name = "Versions")
@SecurityRequirement(name = "bearerAuth")
public class VersionController {

	@Autowired
	private AuthService authService;

	@Autowired
	private VersionService versionService;

	@Autowired
	private VersionMapper versionMapper;

	@GetMapping("/all")
	public Page<VersionDTO> getAllVersions(@RequestParam(defaultValue = "0") Integer page,
										   @RequestParam(defaultValue = "10") Integer size,
										   @RequestParam(defaultValue = "updateTime") String sortBy,
										   @RequestParam(defaultValue = "desc") String sortDirection) {
		Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
		Page<Version> result = versionService.getVersions(authService.getAuthenticatedUser(), paging);
		return new PageImpl<>(versionMapper.toDTOs(result.getContent()), paging, result.getTotalElements());
	}
}
