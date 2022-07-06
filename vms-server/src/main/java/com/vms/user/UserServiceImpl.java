package com.vms.user;

import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import com.vms.user.repository.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Page<User> getUsers(long companyId, Pageable pageable) {
		return userRepository.findAllByCompany(companyId, pageable);
	}

	@Override
	@Transactional
	public List<User> searchUsersNotInApplication(long companyId, long applicationId, String search, long maxResults) {
		List<User> users = userRepository.findAll(UserSpecification.searchUserSpecification(companyId, search));
		return users.stream()
					.filter(user -> !isApplicationUser(user, applicationId))
					.limit(maxResults)
					.collect(Collectors.toList());
	}

	@Override
	public User addUser(User user, Company company) {
		user.setId(0L);
		user.setCompany(company);
		user.setPasswordChangeRequired(true);
		if (passwordIsFilled(user.getPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {
			throw new VMSException("Password is not filled");
		}
		return userRepository.save(user);
	}

	@Override
	public User updateUser(User user, long companyId) {
		User targetUser = getUser(user.getId(), companyId);
		if (!passwordIsFilled(user.getPassword())) {
			user.setPassword(targetUser.getPassword());
		} else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		user.setVersion(targetUser.getVersion());
		user.setCompany(targetUser.getCompany());
		return userRepository.save(user);
	}

	@Override
	public User getUser(long userId, long companyId) {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent() && user.get().getCompany().getId() == companyId) {
			return user.get();
		}
		throw new VMSException(String.format("User with id %s does not exist", userId));
	}

	@Override
	public void deleteUser(long userId, long companyId) {
		User user = getUser(userId, companyId);
		userRepository.delete(user);
	}

	@Override
	public User findUserById(long userId) {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			return user.get();
		}
		throw new VMSException(String.format("User with id %s does not exist", userId));
	}

	@Override
	public List<User> getUsersByCompanyAndIds(long companyId, List<Long> userIds) {
		return userRepository.findUsersByCompanyAndIds(companyId, userIds);
	}

	private boolean passwordIsFilled(String password) {
		return password != null && !password.isEmpty() && !password.isBlank();
	}

	private boolean isApplicationUser(User user, long applicationId) {
		return user.getApplications().stream()
				   .anyMatch(app -> app.getId() == applicationId);
	}
}
