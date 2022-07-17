package com.vms.version;

import com.vms.application.ApplicationService;
import com.vms.exceptions.VMSException;
import com.vms.model.application.Application;
import com.vms.model.user.User;
import com.vms.model.version.Version;
import com.vms.storage.StorageService;
import com.vms.version.repository.VersionRepository;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class VersionServiceImplTest {

	private static final Pageable PAGING = PageRequest.of(0, 5);

	@Mock
	private Logger log;

	@Mock
	private VersionRepository versionRepository;

	@Mock
	private ApplicationService applicationService;

	@Mock
	private StorageService storageService;

	@Mock
	private ApplicationEventPublisher eventPublisher;

	@InjectMocks
	private VersionServiceImpl service;

	@Test
	public void test_empty_versions_when_applications_empty() {
		when(applicationService.getApplications(any(), any())).thenReturn(new PageImpl<>(Collections.emptyList()));

		Page<Version> result = service.getVersions(new User(), PAGING);
		assertTrue(result.isEmpty());
	}

	@Test
	public void test_single_version_for_single_application() {
		Application application = new Application();
		application.setId(1L);

		List<Application> applications = List.of(application);
		when(applicationService.getApplications(any(), any())).thenReturn(new PageImpl<>(applications));

		Version version = new Version();
		version.setId(1L);
		version.setDescription("test");
		version.setApplication(application);

		List<Version> versions = List.of(version);
		Page<Version> page = new PageImpl<>(versions);
		when(versionRepository.findByApplicationIdIn(List.of(1L), PAGING)).thenReturn(page);

		Page<Version> resultPage = service.getVersions(new User(), PAGING);
		List<Version> result = resultPage.getContent();
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
		when(applicationService.getApplications(any(), any())).thenReturn(new PageImpl<>(applications));

		Version version = new Version();
		version.setId(1L);
		version.setDescription("test");
		version.setApplication(application1);

		List<Version> versions = List.of(version);
		Page<Version> page = new PageImpl<>(versions);
		when(versionRepository.findByApplicationIdIn(List.of(1L, 2L), PAGING)).thenReturn(page);

		Page<Version> resultPage = service.getVersions(new User(), PAGING);
		List<Version> result = resultPage.getContent();
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
		when(applicationService.getApplications(any(), any())).thenReturn(new PageImpl<>(applications));

		List<Version> versions = new ArrayList<>();
		for (int i = 0; i < numVersions; i++) {
			Version version = new Version();
			version.setId(i);
			version.setDescription("test" + i);
			version.setApplication(application);

			versions.add(version);
		}
		Page<Version> page = new PageImpl<>(versions);
		when(versionRepository.findByApplicationIdIn(List.of(1L), PAGING)).thenReturn(page);

		Page<Version> resultPage = service.getVersions(new User(), PAGING);
		List<Version> result = resultPage.getContent();
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

		when(applicationService.getApplications(any(), any())).thenReturn(new PageImpl<>(applications));

		Page<Version> page = new PageImpl<>(versions);
		when(versionRepository.findByApplicationIdIn(any(), any())).thenReturn(page);

		Page<Version> resultPage = service.getVersions(new User(), PAGING);
		List<Version> result = resultPage.getContent();
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

	@Test
	@SneakyThrows
	public void test_addVersion_when_can_not_save_files() {
		Version version = new Version();
		version.setId(0);
		version.setFilenames(Arrays.asList("test1.txt", "test2.txt"));

		when(versionRepository.save(any())).thenReturn(version);
		when(storageService.saveFiles(0, null)).thenThrow(new IOException());

		VMSException exception = assertThrows(VMSException.class, () -> service.addVersion(version, null, null));
		assertEquals("filesUploadError", exception.getMessage());
	}

	@Test
	@SneakyThrows
	public void test_addVersion() {
		List<String> filenames = Arrays.asList("test1.txt", "test2.txt");
		Version version = new Version();
		version.setId(0);
		version.setFilenames(filenames);

		when(versionRepository.save(any())).thenReturn(version);
		when(storageService.saveFiles(0, null)).thenReturn(filenames);

		Version actual = service.addVersion(version, null, null);
		assertEquals(0, actual.getId());
		assertEquals(filenames, actual.getFilenames());
	}

	@Test
	@SneakyThrows
	public void test_updateVersion_when_version_not_exists() {
		Version version = new Version();
		version.setId(1);
		version.setFilenames(Arrays.asList("test1.txt", "test2.txt"));

		when(versionRepository.findById(1L)).thenReturn(Optional.empty());

		VMSException exception = assertThrows(VMSException.class, () -> service.updateVersion(version, null));
		assertEquals("Version with ID 1 not exists", exception.getMessage());
	}

	@Test
	@SneakyThrows
	public void test_updateVersion_when_can_not_save_files() {
		Version version = new Version();
		version.setId(1);
		version.setFilenames(Arrays.asList("test1.txt", "test2.txt"));

		MultipartFile[] files = new MultipartFile[3];

		when(versionRepository.findById(1L)).thenReturn(Optional.of(version));
		when(versionRepository.save(any())).thenReturn(version);
		when(storageService.saveFiles(1L, files)).thenThrow(new IOException());

		VMSException exception = assertThrows(VMSException.class, () -> service.updateVersion(version, files));
		assertEquals("filesUploadError", exception.getMessage());
	}

	@Test
	@SneakyThrows
	public void test_updateVersion_when_add_new_files() {
		Version version = new Version();
		version.setId(1);
		version.setFilenames(new ArrayList<>(Arrays.asList("test1.txt", "test2.txt")));

		MultipartFile[] files = new MultipartFile[2];
		files[0] = new MockMultipartFile("test3.txt", new byte[2]);
		files[1] = new MockMultipartFile("test4.txt", new byte[2]);

		when(versionRepository.findById(1L)).thenReturn(Optional.of(version));
		when(versionRepository.save(any())).thenReturn(version);
		when(storageService.saveFiles(1L, files))
			.thenReturn(Arrays.asList("test3.txt", "test4.txt"));

		Version actual = service.updateVersion(version, files);
		for (int i = 1; i <= 4; i++) {
			assertEquals("test" + i + ".txt", actual.getFilenames().get(i - 1));
		}
	}

	@Test
	@SneakyThrows
	public void test_updateVersion_when_deleted_some_files() {
		Version version = new Version();
		version.setId(1);
		version.setFilenames(new ArrayList<>(Arrays.asList("test1.txt", "test2.txt")));

		Version oldVersion = new Version();
		oldVersion.setId(1);
		oldVersion.setFilenames(new ArrayList<>(Arrays.asList("test1.txt", "test2.txt", "test4.txt")));

		MultipartFile[] files = new MultipartFile[1];
		files[0] = new MockMultipartFile("test3.txt", new byte[2]);

		when(versionRepository.findById(1L)).thenReturn(Optional.of(oldVersion));
		when(versionRepository.save(any())).thenReturn(version);
		when(storageService.saveFiles(1L, files)).thenReturn(List.of("test3.txt"));

		Version actual = service.updateVersion(version, files);
		for (int i = 1; i <= 3; i++) {
			assertEquals("test" + i + ".txt", actual.getFilenames().get(i - 1));
		}
	}

	@Test
	@SneakyThrows
	public void test_getVersionFile_when_file_not_exists() {
		long versionId = 1L;
		String filename = "test.txt";
		when(storageService.getFile(versionId, filename)).thenThrow(new IOException());

		VMSException exception = assertThrows(VMSException.class, () -> service.getVersionFile(versionId, filename));
		assertEquals("fileDownloadError", exception.getMessage());
	}

	@Test
	@SneakyThrows
	public void test_getVersionFile_when_file_exists() {
		long versionId = 1L;
		String filename = "test.txt";
		Resource resource = new ByteArrayResource(new byte[3]);
		when(storageService.getFile(versionId, filename)).thenReturn(resource);

		Resource actual = service.getVersionFile(versionId, filename);
		assertEquals(resource, actual);
	}
}
