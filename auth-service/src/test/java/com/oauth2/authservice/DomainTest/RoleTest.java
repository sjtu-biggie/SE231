package com.oauth2.authservice.DomainTest;

import com.oauth2.authservice.domain.Authority;
import com.oauth2.authservice.domain.Role;
import com.oauth2.authservice.domain.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Collections;

@SpringBootTest
@RunWith(SpringRunner.class)
public class RoleTest
{
    @Test
    public void testRole() {
        Role role = new Role(1L, "ROLE_ADMIN");
        Assert.assertEquals((Long)1L, role.getId());
        role.setAuthorities(Collections.singletonList(new Authority("comment")));
        Assert.assertNotNull( role.getAuthorities());
        role.setUsers(Collections.singletonList(new User("name", "pass")));
        Assert.assertNotNull( role.getUsers());
        role.setName("role");
        Assert.assertEquals("role", role.getName());
        Role role1 = new Role("ROLE_ADMIN");
    }
}
