package com.vms.user;

import com.vms.exceptions.VMSException;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Page<User> getUsers(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	@Override
	public User saveUser(User user) {
		try {
			return userRepository.save(user);
		} catch (Exception ex) {
			throw new VMSException(ex.getMessage());
		}
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
}