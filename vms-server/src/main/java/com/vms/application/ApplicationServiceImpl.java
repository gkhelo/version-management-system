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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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
	public List<Application> getApplications(User user) {
		if (user.getRole() == Role.ADMIN) {
			List<Application> companyApplications = applicationRepository.findAllByCompany(user.getCompany());
			List<Application> vendorApplications = applicationRepository.findAllByVendor(user.getCompany());
			return Stream.concat(companyApplications.stream(), vendorApplications.stream()).collect(Collectors.toList());
		}
		return getUserApplications(user.getId());
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
			return findById(applicationId);
		}
		Optional<Application> optionalApplication = getUserApplications(user.getId()).stream()
															   .filter(application -> application.getId() == applicationId)
															   .findAny();
		if (optionalApplication.isEmpty()) {
			throw new VMSException(String.format("User has not access to application with id %s", applicationId));
		}
		return optionalApplication.get();
	}

	@Override
	public void deleteApplication(long applicationId, long companyId) {

	}

	@Override
	@Transactional
	public Application updateVendorUsers(List<Long> vendorUserIds, long applicationId, long vendorId) {
		Application application = applicationRepository.findByIdAndVendor(applicationId, vendorId);
		if (application == null) {
			throw new VMSException(String.format("Error updating vendor users for application with id %s", applicationId));
		}
		List<User> companyUsers = application.getUsers().stream()
											 .filter(user -> user.getCompany().equals(application.getCompany()))
											 .collect(Collectors.toList());
		List<User> vendorUsers = userService.getUsersByCompanyAndIds(vendorId, vendorUserIds);
		List<User> users = Stream.concat(companyUsers.stream(), vendorUsers.stream()).collect(Collectors.toList());
		application.setUsers(users);
		return applicationRepository.save(application);
	}

	@Override
	@Transactional
	public Application updateCompanyUsers(List<Long> companyUserIds, long applicationId, long companyId) {
		Application application = applicationRepository.findByIdAndCompany(applicationId, companyId);
		if (application == null) {
			throw new VMSException(String.format("Error updating vendor users for application with id %s", applicationId));
		}
		List<User> vendorUsers = application.getUsers().stream()
											.filter(user -> user.getCompany().equals(application.getVendor()))
											.collect(Collectors.toList());
		List<User> companyUsers = userService.getUsersByCompanyAndIds(companyId, companyUserIds);
		List<User> users = Stream.concat(companyUsers.stream(), vendorUsers.stream()).collect(Collectors.toList());
		application.setUsers(users);
		return applicationRepository.save(application);
	}

	private List<Application> getUserApplications(long userId) {
		return applicationRepository.findAllByUserId(userId);
	}
}
