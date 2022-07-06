package com.vms.user;

import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private UserServiceImpl service;

	@Test
	public void test_empty_getUsers() {
		when(userRepository.findAllByCompany(any(Long.class), any(Pageable.class))).thenReturn(new PageImpl<>(Collections.emptyList()));

		Page<User> result = service.getUsers(1L, PageRequest.of(0, 10));
		assertEquals(0, result.getTotalElements());
	}

	@Test
	public void test_getUsers() {
		int numUsers = 5;
		String usernamePrefix = "Username_";
		List<User> users = new ArrayList<>();
		for (int i = 0; i < numUsers; i++) {
			User user = new User();
			user.setId(i);
			user.setUsername(usernamePrefix + i);
			users.add(user);
		}

		when(userRepository.findAllByCompany(any(Long.class),any(Pageable.class))).thenReturn(new PageImpl<>(users));
		Page<User> result = service.getUsers(0L, PageRequest.of(0, numUsers));

		assertEquals(numUsers, result.getTotalElements());
		for (int i = 0; i < numUsers; i++) {
			User user = result.getContent().get(i);

			assertEquals(i, user.getId());
			assertEquals(usernamePrefix + i, user.getUsername());
		}
	}

	@Test
	public void test_user_validations() {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		User user = new User();
		user.setId(1);
		user.setEmail("123");
		Set<ConstraintViolation<User>> violations = validator.validate(user);
		assertFalse(violations.isEmpty());
		assertEquals(4, violations.size());
		user.setEmail("123@123");
		user.setPassword("password");
		violations = validator.validate(user);
		assertTrue(violations.isEmpty());
	}

	@Test
	public void test_add_user() {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		List<User> users = new ArrayList<>();
		Company company = new Company();
		company.setId(1L);

		when(userRepository.save(any(User.class))).then(invocationOnMock -> {
			User user = invocationOnMock.getArgument(0);
			if (user.getId() == 0) {
				user.setId(users.size() + 1);
			}
			users.removeIf(user1 -> user.getId() == user1.getId());
			users.add(user);
			return user;
		});

		when(userRepository.findById(any(Long.class))).thenAnswer(invocationOnMock -> {
			Long id = invocationOnMock.getArgument(0);
			return users.stream()
						.filter(user -> id.equals(user.getId()))
						.findAny();
		});

		when(passwordEncoder.encode(any())).then(invocationOnMock -> invocationOnMock.getArgument(0));

		service.addUser(createTestUser(0, "User_1", "123"), company);
		assertEquals(1, users.size());
		Set<ConstraintViolation<User>> violations = validator.validate(users.get(0));
		assertTrue(violations.isEmpty());
		service.updateUser(createTestUser(users.get(0).getId(), "User_1_updated", null), 1);
		assertEquals(1, users.size());
		assertEquals("User_1_updated", users.get(0).getUsername());
		assertEquals("123", users.get(0).getPassword());
		Throwable exception = Assertions.assertThrows(VMSException.class, () -> service.updateUser(createTestUser(12, "test", "test"), 1));
		assertEquals(String.format("User with id %s does not exist", 12), exception.getMessage());
	}

	private User createTestUser(long id, String username, String password) {
		User user = new User();
		user.setId(id);
		user.setUsername(username);
		user.setEmail(username + "@test");
		user.setPassword(password);
		return user;
	}
}
