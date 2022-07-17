package com.vms.version;

import com.vms.application.ApplicationService;
import com.vms.exceptions.VMSException;
import com.vms.model.application.Application;
import com.vms.model.configurable.Configurable;
import com.vms.model.user.User;
import com.vms.model.version.Version;
import com.vms.model.version.VersionStatus;
import com.vms.storage.StorageService;
import com.vms.version.events.VersionCreatedEvent;
import com.vms.version.events.VersionUpdatedEvent;
import com.vms.version.repository.VersionRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
public class VersionServiceImpl implements VersionService {

	@Autowired
	private Logger log;

	@Autowired
	private VersionRepository versionRepository;

	@Autowired
	private ApplicationService applicationService;

	@Autowired
	private StorageService storageService;

	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;

	@Override
	public Page<Version> getVersions(User user, Pageable pageable) {
		List<Application> applications = applicationService.getApplications(user, Pageable.unpaged()).getContent();
		List<Long> applicationIds = applications
			.stream()
			.map(Configurable::getId)
			.collect(Collectors.toList());

		Page<Version> result = versionRepository.findByApplicationIdIn(applicationIds, pageable);
		return result != null ? result : Page.empty();
	}

	@Override
	public Version getVersion(long versionId) {
		return versionRepository.findById(versionId).orElse(null);
	}

	@Override
	@Transactional
	public Version addVersion(Version version, MultipartFile[] files, User user) {
		try {
			version.setStatus(VersionStatus.PENDING);
			Version result = versionRepository.save(version);

			List<String> filenames = storageService.saveFiles(result.getId(), files);
			result.setFilenames(filenames);
			if (result.getApplication() != null) {
				Application application = applicationService.getApplication(result.getApplication().getId(), user);
				applicationEventPublisher.publishEvent(new VersionCreatedEvent(this, application, result));
			}
			return result;
		} catch (IOException ex) {
			log.error("Error occurred while saving files", ex);
			throw new VMSException("filesUploadError");
		}
	}

	@Override
	@Transactional
	public Version updateVersion(Version version, MultipartFile[] files) {
		try {
			long id = version.getId();
			Version oldVersion = versionRepository
				.findById(id)
				.orElseThrow(() -> new VMSException(format("Version with ID %s not exists", id)));
			List<String> oldFilenames = new ArrayList<>(oldVersion.getFilenames());
			if (version.getStatus() == VersionStatus.ACTIVE && oldVersion.getStatus() != VersionStatus.ACTIVE) {
				changeActiveVersion();
			}
			version = versionRepository.save(version);
			List<String> filenames = files != null ? storageService.saveFiles(version.getId(), files) : Collections.emptyList();
			version.getFilenames().addAll(filenames);

			for (String filename : oldFilenames) {
				if (!version.getFilenames().contains(filename)) {
					storageService.deleteFile(id, filename);
					log.info("Deleted {} for version with ID {}", filename, id);
				}
			}

			applicationEventPublisher.publishEvent(new VersionUpdatedEvent(this, version.getApplication(), version));

			return version;
		} catch (IOException ex) {
			log.error("Error occurred while saving files", ex);
			throw new VMSException("filesUploadError");
		}
	}

	@Override
	public Resource getVersionFile(long versionId, String filename) {
		try {
			return storageService.getFile(versionId, filename);
		} catch (IOException ex) {
			log.error("Error occurred while downloading file", ex);
			throw new VMSException("fileDownloadError");
		}
	}

	private void changeActiveVersion() {
		Version version = versionRepository.findActiveVersion(VersionStatus.ACTIVE);
		if (version != null) {
			version.setStatus(VersionStatus.EXPIRED);
			versionRepository.save(version);
		}
	}

}
