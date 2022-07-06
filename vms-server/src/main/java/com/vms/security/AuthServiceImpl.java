package com.vms.security;

import com.vms.model.user.User;
import com.vms.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserService userService;

	@Override
	public User getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Jwt jwt = (Jwt) authentication.getPrincipal();

		long userId = Long.parseLong(jwt.getSubject());
		return userService.findUserById(userId);
	}
}
