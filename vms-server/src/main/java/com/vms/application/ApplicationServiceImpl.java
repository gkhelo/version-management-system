package com.vms.application;

import com.vms.application.repository.ApplicationRepository;
import com.vms.company.CompanyService;
import com.vms.exceptions.VMSException;
import com.vms.model.application.Application;
import com.vms.model.company.Company;
import com.vms.model.user.Role;
import com.vms.model.user.User;
import com.vms.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	CompanyService companyService;

	@Autowired
	UserService userService;

	@Autowired
	ApplicationRepository applicationRepository;

	@Override
	public Application findById(long applicationId) {
		return applicationRepository.findById(applicationId)
									.orElseThrow(() -> new VMSException(String.format("Application with id %s does not exist", applicationId)));
	}

	@Override
	public Page<Application> getApplications(User user, Pageable pageable) {
		if (user.getRole() == Role.ADMIN) {
			return applicationRepository.findAllByCompanyOrVendor(user.getCompany().getId(), pageable);
		}
		return applicationRepository.getUserApplications(user.getId(), pageable);
	}

	@Override
	public Application addApplication(Application application, long companyId) {
		Company company = companyService.findById(companyId);
		application.setCompany(company);
		return applicationRepository.save(application);
	}

	@Override
	@Transactional
	public Application updateApplication(Application application, long companyId) {
		Application existingApplication = applicationRepository.findByIdAndCompanyOrVendor(application.getId(), companyId);
		if (existingApplication == null) {
			throw new VMSException("Incorrect parameters for updating application");
		}
		application.setUsers(existingApplication.getUsers());
		application.setVersion(existingApplication.getVersion());
		return applicationRepository.save(application);
	}

	@Override
	public Application getApplication(long applicationId, User user) {
		if (user.getRole() == Role.ADMIN) {
			return applicationRepository.findByIdAndCompanyOrVendor(applicationId, user.getCompany().getId());
		}
		Application application = applicationRepository.findByApplicationIdAndUser(applicationId, user.getId());
		if (application == null) {
			throw new VMSException(String.format("User has not access to application with id %s", applicationId));
		}
		return application;
	}

	@Override
	public void deleteApplication(long applicationId, long companyId) {

	}

	@Override
	@Transactional
	public Application updateApplicationUsersForCompany(List<Long> userIds, long applicationId, long companyId) {
		Application application = applicationRepository.findByIdAndCompanyOrVendorFetchUsers(applicationId, companyId);
		if (application == null) {
			throw new VMSException(String.format("Error updating users for application with id %s", applicationId));
		}

		List<User> otherCompanyUsers = application.getUsers().stream()
											 .filter(user -> user.getCompany().getId() != companyId)
											 .collect(Collectors.toList());
		List<User> updatedUsers = userService.getUsersByCompanyAndIds(companyId, userIds);
		List<User> users = Stream.concat(otherCompanyUsers.stream(), updatedUsers.stream()).collect(Collectors.toList());
		application.setUsers(users);
		return applicationRepository.save(application);
	}

	@Override
	public List<User> getApplicationUsers(long applicationId, long companyId) {
		return applicationRepository.getUsersByApplicationAndCompanyId(applicationId, companyId);
	}
}
