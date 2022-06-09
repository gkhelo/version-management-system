package com.vms.user;

import com.vms.exceptions.VMSException;
import com.vms.model.user.User;
import com.vms.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new VMSException("User not exists"));
    }

    @Override
    public User addUser(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception ex) {
            throw new VMSException(ex.getMessage());
        }
    }
}