package com.vms.user;

import com.vms.model.company.Company;
import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

	Page<User> getUsers(long companyId, Pageable pageable);

	List<User> searchUsersNotInApplication(long companyId, long applicationId, String search, long maxResults);

	User addUser(User user, Company company);

	User updateUser(User user, long companyId);

	User getUser(long userId, long companyId);

	void deleteUser(long userId, long companyId);

	User findUserById(long userId);

	List<User> getApplicationUsers(long applicationId, long companyId);
}
