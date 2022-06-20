package com.vms.user;

import com.vms.exceptions.VMSException;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Page<User> getUsers(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	@Override
	public User addUser(User user) {
		user.setId(0L);
		user.setPasswordChangeRequired(true);
		if (passwordIsFilled(user.getPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {
			throw new VMSException("Password is not filled");
		}
		return userRepository.save(user);
	}

	@Override
	public User updateUser(User user) {
		User targetUser = getUser(user.getId());
		if (!passwordIsFilled(user.getPassword())) {
			user.setPassword(targetUser.getPassword());
		} else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		user.setVersion(targetUser.getVersion());
		return userRepository.save(user);
	}

	@Override
	public User getUser(long userId) {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent()) {
			return user.get();
		}
		throw new VMSException(String.format("User with id %s does not exist", userId));
	}

	@Override
	public void deleteUser(long userId) {
		userRepository.deleteById(userId);
	}

	private boolean passwordIsFilled(String password) {
		return password != null && !password.isEmpty() && !password.isBlank();
	}
}
