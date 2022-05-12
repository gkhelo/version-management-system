package com.vms.user;

import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl service;

    @Test
    public void test_empty_getUsers() {
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        List<User> result = service.getUsers();
        assertEquals(0, result.size());
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

        when(userRepository.findAll()).thenReturn(users);
        List<User> result = service.getUsers();

        assertEquals(numUsers, result.size());
        for (int i = 0; i < numUsers; i++) {
            User user = result.get(i);

            assertEquals(i, user.getId());
            assertEquals(usernamePrefix + i, user.getUsername());
        }
    }
}