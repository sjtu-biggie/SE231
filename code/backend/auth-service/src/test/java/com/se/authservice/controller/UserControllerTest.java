package com.se.authservice.controller;

import com.se.authservice.config.MethodSecurityConfig;
import com.se.authservice.config.ResourceServer;
import com.se.authservice.service.UserService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
@ContextConfiguration
@Import({ResourceServer.class, MethodSecurityConfig.class})
@ActiveProfiles("test")
public class UserControllerTest {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }
    @Resource(name="userServiceImpl")
    UserService userService;

    @Test
    public void updateTest() throws Exception {
        mvc.perform(delete("/delete/username/root"))
                .andExpect(status().isOk());
        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"root\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null}"))
                .andExpect(status().isOk());
        MultiValueMap<String, String> mm = new LinkedMultiValueMap<>();

        mvc.perform(put("/update/root").params(mm))
                .andExpect(status().isOk());

        mvc.perform(put("/update/notroot").params(mm))
                .andExpect(status().isOk());

        mm.add("password","bamd");
        mm.add("mail", "isa@qq.com");
        mm.add("imgUrl","nothing");
        mm.add("role", "0");
        mvc.perform(put("/update/root").params(mm))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteTest() throws Exception {
        mvc.perform(delete("/delete/username/root"))
                .andExpect(status().isOk());
        Assert.assertNull(userService.selectByUsername("root"));
        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"root\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null, \"role\":0}"))
                .andExpect(status().isOk());
        Long id = userService.selectAll().iterator().next().getId();
        mvc.perform(delete("/delete/id/" + id))
                .andExpect(status().isOk());
        Assert.assertNull(userService.selectUserById(id));

    }


    //    @WithMockUser(roles={"ADMIN"})
    @Test
    public void controllerTest() throws  Exception{

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/username/root").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(get("/username/no").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.content().string(""));
    }
}