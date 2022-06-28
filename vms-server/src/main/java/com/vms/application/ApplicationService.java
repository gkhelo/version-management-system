package com.vms.application;

import com.vms.model.application.Application;
import com.vms.model.user.User;

import java.util.List;

public interface ApplicationService {

	Application findById(long applicationId);

	List<Application> getApplications(User user);

	Application addApplication(Application application, long companyId);

	Application updateApplication(Application application, long companyId);

	Application getApplication(long applicationId, User user);

	void deleteApplication(long applicationId, long companyId);

	Application updateVendorUsers(List<Long> vendorUserIds, long applicationId, long vendorId);

	Application updateCompanyUsers(List<Long> companyUserIds, long applicationId, long companyId);
}
