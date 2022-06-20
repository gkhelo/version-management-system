package com.vms.company;

import com.vms.company.repository.CompanyRepository;
import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.lang.String.format;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceImplTest {

	@Mock
	private CompanyRepository companyRepository;

	@Mock
	private UserService userService;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private CompanyServiceImpl service;

	@Test
	public void test_empty_getCompanies() {
		when(companyRepository.findAll()).thenReturn(Collections.emptyList());

		List<Company> result = service.getCompanies();
		assertEquals(0, result.size());
	}

	@Test
	public void test_getCompanies() {
		int numCompanies = 5;
		String namePrefix = "name_";

		List<Company> companies = new ArrayList<>();
		for (int i = 0; i < numCompanies; i++) {
			Company company = new Company();
			company.setId(i);
			company.setName(namePrefix + i);

			companies.add(company);
		}

		when(companyRepository.findAll()).thenReturn(companies);
		List<Company> result = service.getCompanies();

		assertEquals(numCompanies, result.size());
		for (int i = 0; i < numCompanies; i++) {
			Company company = result.get(i);

			assertEquals(i, company.getId());
			assertEquals(namePrefix + i, company.getName());
		}
	}

	@Test
	public void test_addCompany_when_company_already_exists() {
		Company company = new Company();
		company.setName("Test");
		company.setEmail("test@mail.com");

		User admin = new User();
		admin.setUsername("admin");

		when(companyRepository.save(any())).thenThrow(DataIntegrityViolationException.class);

		VMSException exception = assertThrows(VMSException.class, () -> service.addCompany(company, admin));
		assertEquals(format("Company with name %s already exists", company.getName()), exception.getMessage());
	}

	@Test
	public void test_addCompany() {
		Company company = new Company();
		company.setId(1L);
		company.setName("Test");
		company.setEmail("test@mail.com");

		User admin = new User();
		admin.setUsername("admin");
		admin.setCompany(company);

		when(companyRepository.save(any())).thenReturn(company);

		Company actualCompany = service.addCompany(company, admin);

		assertEquals(company.getId(), actualCompany.getId());
		assertEquals(company.getName(), actualCompany.getName());
		assertEquals(company.getEmail(), actualCompany.getEmail());

		assertEquals(company.getUsers().size(), 1);

		User actualUser = company.getUsers().get(0);
		assertEquals(actualUser.getUsername(), admin.getUsername());
	}
}
