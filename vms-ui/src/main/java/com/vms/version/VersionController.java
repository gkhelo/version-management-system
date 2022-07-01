package com.vms.version;

import com.vms.security.AuthService;
import com.vms.version.dto.VersionDTO;
import com.vms.version.mapper.VersionMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
	public List<VersionDTO> getAllVersions() {
		return versionMapper.toDTOs(versionService.getVersions(authService.getAuthenticatedUser()));
	}
}
