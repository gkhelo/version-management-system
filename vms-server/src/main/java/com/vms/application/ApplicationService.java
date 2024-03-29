package com.vms.application;

import com.vms.model.application.Application;
import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ApplicationService {

	Page<Application> getApplications(User user, Pageable pageable);

	Application addApplication(Application application, long companyId);

	Application updateApplication(Application application, long companyId);

	Application getApplication(long applicationId, User user);

	void deleteApplication(long applicationId, long companyId);

	Application addApplicationUser(Long applicationId, long userId, User user);

	Application deleteApplicationUser(Long applicationId, long userId, User user);
}
