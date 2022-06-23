package com.vms.security;

import com.vms.model.user.User;

public interface AuthService {

	User getAuthenticatedUser();
}
