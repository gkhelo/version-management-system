package com.vms.version;

import com.vms.application.ApplicationService;
import com.vms.model.application.Application;
import com.vms.model.user.User;
import com.vms.model.version.Version;
import com.vms.version.repository.VersionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class VersionServiceImplTest {

	@Mock
	private VersionRepository versionRepository;

	@Mock
	private ApplicationService applicationService;

	@InjectMocks
	private VersionServiceImpl service;

	@Test
	public void test_empty_versions_when_applications_empty() {
		when(applicationService.getApplications(any())).thenReturn(Collections.emptyList());

		List<Version> result = service.getVersions(new User());
		assertTrue(result.isEmpty());
	}

	@Test
	public void test_single_version_for_single_application() {
		Application application = new Application();
		application.setId(1L);

		List<Application> applications = List.of(application);
		when(applicationService.getApplications(any())).thenReturn(applications);

		Version version = new Version();
		version.setId(1L);
		version.setDescription("test");
		version.setApplication(application);

		List<Version> versions = List.of(version);
		when(versionRepository.findByApplicationIdIn(List.of(1L))).thenReturn(versions);

		List<Version> result = service.getVersions(new User());
		assertEquals(1, result.size());

		Version actual = result.get(0);
		assertEquals(version.getId(), actual.getId());
		assertEquals(version.getDescription(), actual.getDescription());
	}

	@Test
	public void test_single_version_for_multiple_applications() {
		Application application1 = new Application();
		application1.setId(1L);

		Application application2 = new Application();
		application2.setId(2L);

		List<Application> applications = List.of(application1, application2);
		when(applicationService.getApplications(any())).thenReturn(applications);

		Version version = new Version();
		version.setId(1L);
		version.setDescription("test");
		version.setApplication(application1);

		List<Version> versions = List.of(version);
		when(versionRepository.findByApplicationIdIn(List.of(1L, 2L))).thenReturn(versions);

		List<Version> result = service.getVersions(new User());
		assertEquals(1, result.size());

		Version actual = result.get(0);
		assertEquals(version.getId(), actual.getId());
		assertEquals(version.getDescription(), actual.getDescription());
	}

	@Test
	public void test_multiple_versions_for_single_application() {
		int numVersions = 5;

		Application application = new Application();
		application.setId(1L);

		List<Application> applications = List.of(application);
		when(applicationService.getApplications(any())).thenReturn(applications);

		List<Version> versions = new ArrayList<>();
		for (int i = 0; i < numVersions; i++) {
			Version version = new Version();
			version.setId(i);
			version.setDescription("test" + i);
			version.setApplication(application);

			versions.add(version);
		}
		when(versionRepository.findByApplicationIdIn(List.of(1L))).thenReturn(versions);

		List<Version> result = service.getVersions(new User());
		assertEquals(numVersions, result.size());

		for (int i = 0; i < numVersions; i++) {
			Version actual = result.get(i);
			assertEquals(i, actual.getId());
			assertEquals("test" + i, actual.getDescription());
		}
	}

	@Test
	public void test_multiple_versions_for_multiple_application() {
		int numApplications = 3;
		int numVersions = 5;

		List<Application> applications = new ArrayList<>();
		List<Version> versions = new ArrayList<>();
		for (int i = 0; i < numApplications; i++) {
			Application application = new Application();
			application.setId(i);

			for (int j = 0; j < numVersions; j++) {
				int index = i * numApplications + j;

				Version version = new Version();
				version.setId(index);
				version.setDescription("test" + index);
				version.setApplication(application);

				versions.add(version);
			}

			applications.add(application);
		}

		when(applicationService.getApplications(any())).thenReturn(applications);
		when(versionRepository.findByApplicationIdIn(any())).thenReturn(versions);

		List<Version> result = service.getVersions(new User());
		assertEquals(numApplications * numVersions, result.size());

		for (int i = 0; i < numApplications; i++) {
			for (int j = 0; j < numVersions; j++) {
				int index = i * numApplications + j;

				Version actual = result.get(index);
				Version expected = versions.get(index);

				assertEquals(expected.getId(), actual.getId());
				assertEquals(expected.getDescription(), actual.getDescription());
			}
		}
	}
}
