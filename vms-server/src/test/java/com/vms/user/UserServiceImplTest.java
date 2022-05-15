package com.vms.user;

import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
}