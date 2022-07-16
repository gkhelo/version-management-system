package com.vms.application;

import com.vms.application.repository.ApplicationRepository;
import com.vms.company.CompanyService;
import com.vms.exceptions.VMSException;
import com.vms.model.application.Application;
import com.vms.model.company.Company;
import com.vms.model.user.Role;
import com.vms.model.user.User;
import com.vms.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ApplicationServiceImplTest {

	@Mock
	ApplicationRepository applicationRepository;

	@Mock
	CompanyService companyService;

	@Mock
	UserService userService;

	@InjectMocks
	private ApplicationServiceImpl service;

	private Company company;

	private Company vendor;

	private final List<User> users = new ArrayList<>();

	private final List<Application> applications = new ArrayList<>();

	@BeforeEach
	public void setup() {
		this.company = new Company();
		company.setId(1L);
		company.setName("company");
		this.vendor = new Company();
		vendor.setId(2L);
		vendor.setName("vendor");
		User user1 = new User();
		user1.setRole(Role.ADMIN);
		user1.setId(1L);
		User user2 = new User();
		user2.setRole(Role.USER);
		user2.setId(2L);
		User user3 = new User();
		user3.setRole(Role.ADMIN);
		user3.setId(3L);
		User user4 = new User();
		user4.setRole(Role.USER);
		user4.setId(4L);
		user1.setCompany(company);
		user2.setCompany(company);
		user3.setCompany(vendor);
		user4.setCompany(vendor);
		Application app1 = new Application();
		app1.setName("App1");
		app1.setCompany(company);
		app1.setVendor(vendor);
		app1.setId(1L);
		app1.setUsers(new ArrayList<>(List.of(user2)));
		Application app2 = new Application();
		app2.setName("App2");
		app2.setCompany(company);
		app2.setVendor(vendor);
		app2.setId(2L);
		app2.setUsers(new ArrayList<>(Arrays.asList(user1, user2)));
		company.setUsers(new ArrayList<>(Arrays.asList(user1, user2)));
		vendor.setUsers(new ArrayList<>(Arrays.asList(user2, user4)));
		user1.setApplications(new ArrayList<>());
		user2.setApplications(new ArrayList<>(Arrays.asList(app1, app2)));
		user3.setApplications(new ArrayList<>(List.of(app2)));
		user4.setApplications(new ArrayList<>(List.of(app2)));
		applications.addAll(new ArrayList<>(Arrays.asList(app1, app2)));
		users.addAll(new ArrayList<>(Arrays.asList(user1, user2, user3, user4)));
	}

	@Test
	public void test_empty_getApplications() {
		useGetUserApplicationsStub();
		User user = new User();
		user.setRole(Role.USER);
		user.setId(10);
		Page<Application> result = service.getApplications(user, PageRequest.of(0, 10));
		assertEquals(0, result.getTotalElements());
	}

	@Test
	public void test_getApplications() {
		useFindAllByCompanyOrVendorStub();
		useGetUserApplicationsStub();
		Page<Application> result = service.getApplications(company.getUsers().get(0), PageRequest.of(0, 10));
		assertEquals(2, result.getTotalElements());
		result = service.getApplications(vendor.getUsers().get(0), PageRequest.of(0, 10));
		assertEquals(2, result.getTotalElements());
		result = service.getApplications(company.getUsers().get(1), PageRequest.of(0, 10));
		assertEquals(2, result.getTotalElements());
		result = service.getApplications(vendor.getUsers().get(1), PageRequest.of(0, 10));
		assertEquals(1, result.getTotalElements());
	}

	@Test
	public void test_addApplication() {
		useCompanyServiceFindByIdStub();
		useApplicationSaveStub();
		Application app = new Application();
		app.setId(10L);
		assertEquals(company.getId(), service.addApplication(app, company.getId()).getCompany().getId());
		assertEquals(vendor.getId(), service.addApplication(app, vendor.getId()).getCompany().getId());
	}

	@Test
	public void test_updateApplication() {
		useFindByIdCompanyOrVendorStub();
		useApplicationSaveStub();
		Application app = applications.get(0);
		app.setName("Updated_app");
		Application updatedApp = service.updateApplication(app, company.getId());
		assertEquals("Updated_app", updatedApp.getName());
		assertEquals(1, app.getUsers().size());
		Throwable exception = Assertions.assertThrows(VMSException.class, () -> service.updateApplication(app, 4L));
		assertEquals("Incorrect parameters for updating application", exception.getMessage());
	}


	@Test
	public void test_getApplication() {
		useFindByIdCompanyOrVendorStub();
		useFindByApplicationAndUserStub();
		Application app = service.getApplication(1L, users.get(0));
		assertNotNull(app);
		app = service.getApplication(1L, users.get(1));
		assertNotNull(app);
		Throwable exception = Assertions.assertThrows(VMSException.class, () -> service.getApplication(3L, users.get(3)));
		assertEquals(String.format("User has not access to application with id %s", 3), exception.getMessage());
	}

	@Test
	public void test_deleteApplication() {
		useFindByIdStub();
		service.deleteApplication(1L, 1L);
		Throwable exception = Assertions.assertThrows(VMSException.class, () -> service.deleteApplication(3L, 3L));
		assertEquals(String.format("Application with id %s does not exist", 3L), exception.getMessage());
	}

	@Test
	public void test_addApplicationUser() {
		useFindByIdCompanyOrVendorStub();
		useGetUserStub();
		service.addApplicationUser(1L, 4L, users.get(2));
		assertEquals(2L, applications.get(0).getUsers().size());
		assertEquals(2L, applications.get(0).getUsers().get(1).getApplications().size());
		service.addApplicationUser(1L, 2L, users.get(0));
		assertEquals(2L, applications.get(0).getUsers().size());
	}

	@Test
	public void test_deleteApplicationUser() {
		useFindByIdCompanyOrVendorStub();
		useGetUserStub();
		service.deleteApplicationUser(2L, 2L, users.get(0));
		assertEquals(1L, applications.get(1).getUsers().size());
	}

	private void useFindAllByCompanyOrVendorStub() {
		when(applicationRepository.findAllByCompanyOrVendor(any(Long.class), any(Pageable.class))).thenAnswer(invocationOnMock -> {
			long companyId = invocationOnMock.getArgument(0);
			List<Application> apps = applications.stream()
												 .filter(app -> app.getCompany().getId() == companyId || app.getVendor().getId() == companyId)
												 .collect(Collectors.toList());
			return new PageImpl<>(apps);
		});
	}

	private void useFindByIdCompanyOrVendorStub() {
		when(applicationRepository.findByIdAndCompanyOrVendor(any(Long.class), any(Long.class))).thenAnswer(invocationOnMock -> {
			long applicationId = invocationOnMock.getArgument(0);
			long companyId = invocationOnMock.getArgument(1);
			Optional<Application> application = applications.stream()
															.filter(app -> app.getId() == applicationId && (app.getCompany().getId() == companyId || app.getVendor().getId() == companyId))
															.findFirst();
			return application.orElse(null);
		});
	}

	private void useGetUserApplicationsStub() {
		when(applicationRepository.getUserApplications(any(Long.class), any(Pageable.class))).thenAnswer(invocationOnMock -> {
			long userId = invocationOnMock.getArgument(0);
			Optional<User> user = users.stream().filter(u -> u.getId() == userId).findFirst();
			if (user.isPresent()) {
				return new PageImpl<>(user.get().getApplications());
			}
			return new PageImpl<>(new ArrayList<>());
		});
	}

	private void useFindByApplicationAndUserStub() {
		when(applicationRepository.findByApplicationIdAndUser(any(Long.class), any(Long.class))).thenAnswer(invocationOnMock -> {
			long applicationId = invocationOnMock.getArgument(0);
			long userId = invocationOnMock.getArgument(1);
			Optional<User> user = users.stream().filter(u -> u.getId() == userId).findFirst();
			if (user.isEmpty()) {
				return null;
			}
			List<Application> applications = user.get().getApplications();
			Optional<Application> application = applications.stream()
															.filter(app -> app.getId() == applicationId)
															.findFirst();
			return application.orElse(null);
		});
	}

	private void useCompanyServiceFindByIdStub() {
		when(companyService.findById(any(Long.class))).thenAnswer(invocationOnMock -> {
			long companyId = invocationOnMock.getArgument(0);
			return company.getId() == companyId ? company : vendor.getId() == companyId ? vendor : null;
		});
	}

	private void useGetUserStub() {
		when(userService.getUser(any(Long.class), any(Long.class))).thenAnswer(invocationOnMock -> {
			long userId = invocationOnMock.getArgument(0);
			long companyId = invocationOnMock.getArgument(1);
			Optional<User> user = users.stream().filter(u -> u.getId() == userId && u.getCompany().getId() == companyId).findFirst();
			return user.orElse(null);
		});
	}

	private void useFindByIdStub() {
		when(applicationRepository.findById(any(Long.class))).thenAnswer(invocationOnMock -> {
			long appId = invocationOnMock.getArgument(0);
			return applications.stream()
							   .filter(app -> app.getId() == appId)
							   .findAny();
		});
	}

	private void useApplicationSaveStub() {
		when(applicationRepository.save(any(Application.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));
	}

}
