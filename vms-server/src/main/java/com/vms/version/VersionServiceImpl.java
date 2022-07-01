package com.vms.version;

import com.vms.application.ApplicationService;
import com.vms.model.application.Application;
import com.vms.model.configurable.Configurable;
import com.vms.model.user.User;
import com.vms.model.version.Version;
import com.vms.version.repository.VersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VersionServiceImpl implements VersionService {

	@Autowired
	private VersionRepository versionRepository;

	@Autowired
	private ApplicationService applicationService;

	@Override
	public List<Version> getVersions(User user) {
		List<Application> applications = applicationService.getApplications(user);
		List<Long> applicationIds = applications
			.stream()
			.map(Configurable::getId)
			.collect(Collectors.toList());

		return versionRepository.findByApplicationIdIn(applicationIds);
	}
}
