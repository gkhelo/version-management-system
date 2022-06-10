package com.vms.user;

import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    @InjectMocks
    private UserServiceImpl service;

    @Test
    public void test_empty_getUsers() {
        when(userRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(Collections.emptyList()));

        Page<User> result = service.getUsers(PageRequest.of(0, 10));
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

        when(userRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(users));
        Page<User> result = service.getUsers(PageRequest.of(0, numUsers));

        assertEquals(numUsers, result.getTotalElements());
        for (int i = 0; i < numUsers; i++) {
            User user = result.getContent().get(i);

            assertEquals(i, user.getId());
            assertEquals(usernamePrefix + i, user.getUsername());
        }
    }

    @Test
    public void test_email_validation() {
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

}