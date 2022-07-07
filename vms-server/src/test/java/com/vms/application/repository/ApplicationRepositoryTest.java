package com.vms.application.repository;

import com.vms.company.repository.CompanyRepository;
import com.vms.model.application.Application;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@DataJpaTest
public class ApplicationRepositoryTest {
	@Autowired
	ApplicationRepository applicationRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	UserRepository userRepository;

	Map<String, Company> companyMap = new HashMap<>();

	Map<String, User> userMap = new HashMap<>();


	@BeforeEach
	public void setup() {
		Company company1 = createTestCompany("Company1");
		Company company2 = createTestCompany("Company2");
		createTestUser("User1", company1);
		createTestUser("User2", company2);
	}

	@Test
	public void testApplicationSave() {
		createTestApplication("TestApp", "Company1", "Company2");
	}

	@Test
	public void testFindAllApplicationByCompanyOrVendor() {
		Application app = createTestApplication("TestApp", "Company1", "Company2");
		assertEquals(app, applicationRepository.findAllByCompanyOrVendor(companyMap.get("Company1").getId(), Pageable.ofSize(10)).getContent().get(0));
		assertEquals(app, applicationRepository.findAllByCompanyOrVendor(companyMap.get("Company2").getId(), Pageable.ofSize(10)).getContent().get(0));
		assertEquals(0, applicationRepository.findAllByCompanyOrVendor(companyMap.get("Company1").getId() + companyMap.get("Company2").getId(), Pageable.ofSize(10)).getTotalElements());
	}

	@Test
	@Transactional
	public void testGetUserApplications() {
		Application app = createTestApplication("TestApp", "Company1", "Company2");
		app.setUsers(List.of(userMap.get("User1")));
		Application app2 = createTestApplication("TestApp2", "Company1", "Company2");
		app2.setUsers(List.of(userMap.get("User1"), userMap.get("User2")));
		assertEquals(2, applicationRepository.getUserApplications(userMap.get("User1").getId(), Pageable.ofSize(10)).getTotalElements());
		assertEquals(1, applicationRepository.getUserApplications(userMap.get("User2").getId(), Pageable.ofSize(10)).getTotalElements());
		assertEquals(2, app2.getUsers().size());
	}

	@Test
	public void testFindByApplicationIdAndUser() {
		Application app = createTestApplication("TestApp", "Company1", "Company2");
		app.setUsers(List.of(userMap.get("User1")));
		Application app2 = createTestApplication("TestApp2", "Company1", "Company2");
		app2.setUsers(List.of(userMap.get("User1"), userMap.get("User2")));
		Application a1 = applicationRepository.findByApplicationIdAndUser(app.getId(), userMap.get("User1").getId());
		assertNotNull(a1);
		assertEquals(1, a1.getUsers().size());
		Application a2 = applicationRepository.findByApplicationIdAndUser(app2.getId(), userMap.get("User2").getId());
		assertNotNull(a2);
		assertEquals(2, a2.getUsers().size());
		assertNull(applicationRepository.findByApplicationIdAndUser(app.getId(), userMap.get("User2").getId()));
	}

	@Test
	public void testFindApplicationByIdAndCompanyOrVendor() {
		Application app = createTestApplication("TestApp", "Company2", "Company1");
		assertEquals(app, applicationRepository.findByIdAndCompanyOrVendor(app.getId(), companyMap.get("Company1").getId()));
		assertEquals(app, applicationRepository.findByIdAndCompanyOrVendor(app.getId(), companyMap.get("Company2").getId()));
		assertNull(applicationRepository.findByIdAndCompanyOrVendor(app.getId(), companyMap.get("Company1").getId() + companyMap.get("Company2").getId()));
	}

	private Application createTestApplication(String name, String company, String vendor) {
		Application application = new Application();
		application.setName(name);
		application.setCompany(companyMap.get(company));
		application.setVendor(companyMap.get(vendor));
		return applicationRepository.save(application);
	}

	private void createTestUser(String username, Company company) {
		User user = new User();
		user.setUsername(username);
		user.setCompany(company);
		user.setPassword(UUID.randomUUID().toString());
		user.setEmail(username + "@test.com");
		userMap.put(username, user);
		userRepository.save(user);
	}

	private Company createTestCompany(String name) {
		Company company = new Company();
		company.setName(name);
		companyMap.put(name, company);
		return companyRepository.save(company);
	}
}
