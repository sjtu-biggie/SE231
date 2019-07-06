package com.se.topicservice;

import com.se.topicservice.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class UserClientFallback implements UserClient{

    @Override
    public User getUserById(Long userId) {
        User user = new User();
        user.setId(1L);
        user.setMail("mail@mail.com");
        user.setPassword("123");
        user.setRole(0);
        user.setUsername("mock");
        return user;
    }

    @Override
    public Iterable<User> getAllUsers() {
        Iterable<User> userIterable = new Iterable<User>() {
            @Override
            public Iterator<User> iterator() {
                List<User> userList = new ArrayList<>();
                User user = new User();
                user.setId(1L);
                user.setMail("mail@mail.com");
                user.setPassword("123");
                user.setRole(0);
                user.setUsername("mock");
                userList.add(user);
                return userList.iterator();
            }
        };
        return userIterable;
    }
}
