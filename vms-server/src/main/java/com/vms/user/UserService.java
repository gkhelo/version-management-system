package com.vms.user;

import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

	Page<User> getUsers(Pageable pageable);

	User addUser(User user);

	User updateUser(User user);

	User getUser(long userId);

	void deleteUser(long userId);

	List<User> getUsersByCompanyAndIds(long companyId, List<Long> userIds);
}
