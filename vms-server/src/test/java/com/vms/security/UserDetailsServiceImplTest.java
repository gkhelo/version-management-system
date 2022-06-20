package com.vms.security;

import com.vms.model.security.CustomUserDetails;
import com.vms.model.user.Role;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Optional;

import static java.lang.String.format;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private UserDetailsServiceImpl service;

	@Test
	public void shouldThrowException_when_userNotExists() {
		when(userRepository.findByUsername(any())).thenReturn(Optional.empty());

		String username = "username";
		UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> service.loadUserByUsername(username));

		assertEquals(format("User %s not exists", username), exception.getMessage());
	}

	@Test
	public void shouldReturnUserDetails_when_userExists() {
		String username = "username";
		String password = "password";
		Role role = Role.ADMIN;

		User user = new User();
		user.setUsername(username);
		user.setPassword(password);
		user.setRole(role);

		when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

		UserDetails details = service.loadUserByUsername(username);
		assertInstanceOf(CustomUserDetails.class, details);

		CustomUserDetails customUserDetails = (CustomUserDetails) details;
		assertEquals(username, customUserDetails.getUsername());
		assertEquals(password, customUserDetails.getPassword());

		assertEquals(1, customUserDetails.getAuthorities().size());
		assertEquals(role.name(), new ArrayList<GrantedAuthority>(customUserDetails.getAuthorities()).get(0).getAuthority());

		assertEquals(user, customUserDetails.getUser());
	}
}
