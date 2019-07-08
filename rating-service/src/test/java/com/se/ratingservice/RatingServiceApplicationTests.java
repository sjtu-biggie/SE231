package com.se.ratingservice;

import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.ratingservice.entity.Item;
import org.apache.commons.collections.keyvalue.TiedMapEntry;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.netflix.ribbon.StaticServerList;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import java.sql.Timestamp;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = {
        "feign.hystrix.enabled=true"
})
@ContextConfiguration(classes = {RatingServiceApplicationTests.LocalRibbonClientConfiguration.class})
public class RatingServiceApplicationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Resource(name="ratingServiceImpl")
    RatingService ratingService;

    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @Autowired
    ItemClient itemClient;

    @Test
    public void testApplication() {
        RatingServiceApplication.main(new String[] {});
    }

    /*
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "item_id", nullable = false)
    private Long itemId;
    @Column(name = "avg_score")
    private float avgScore;
    @Column(name = "rank")
    private Integer rank;
    @Column(name = "tot_score_num")
    private Integer totScoreNum;
    @Column(name = "type")
    private Integer type;
     */

    @Test
    public void controllerTest() throws Exception {
        // add mock item
        Item item = new Item();
        item.setId(1L);
        item.setImgurl(null);
        item.setChapterNum(12);
        item.setItemname("mock");
        item.setMainAuthor("bamdb");
        item.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item.setType(0);
        itemClient.postItem(item);
        Item item1 = new Item();
        item1.setId(2L);
        item1.setImgurl(null);
        item1.setChapterNum(12);
        item1.setItemname("mock");
        item1.setMainAuthor("bamdb");
        item1.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item1.setType(0);
        itemClient.postItem(item1);

        mvc.perform(post("/add/itemid/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/itemid/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/itemid/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/itemid/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/itemid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        mvc.perform(get("/itemid/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        itemClient.deleteItemById(2L);
        mvc.perform(get("/itemid/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/browser?type=0&page=0&pageSize=5").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateTest() throws Exception {
        Item item = new Item();
        item.setId(1L);
        item.setImgurl(null);
        item.setChapterNum(12);
        item.setItemname("mock");
        item.setMainAuthor("bamdb");
        item.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item.setType(0);
        itemClient.postItem(item);
        mvc.perform(post("/add/itemid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(put("/update/itemid/1").contentType(MediaType.APPLICATION_JSON)
                .content("[100, 0, 0, 0, 0, 0, 0, 0, 0]"))
                .andExpect(status().isOk());

        mvc.perform(put("/update/itemid/0").contentType(MediaType.APPLICATION_JSON)
                .content("[0, 100, 0, 0, 0, 0, 0, 0, 0, 0]"))
                .andExpect(status().isOk());

        mvc.perform(put("/update/itemid/1").contentType(MediaType.APPLICATION_JSON)
                .content("[0, 100, 0, 0, 0, 0, 0, 0, 0, 0]"))
                .andExpect(status().isOk());

        mvc.perform(put("/update/itemid/1").contentType(MediaType.APPLICATION_JSON)
                .content("[0, 0, 0, 0, 0, 0, 0, 0, 0, 100]"))
                .andExpect(status().isOk());

        Assert.assertEquals(6.0, ratingService.selectByItemId(1L).getAvgScore(), 0.000001);
    }

    @Test
    public void deleteTest() throws Exception {
        Item item = new Item();
        item.setId(1L);
        item.setImgurl(null);
        item.setChapterNum(12);
        item.setItemname("mock");
        item.setMainAuthor("bamdb");
        item.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item.setType(0);
        itemClient.postItem(item);
        Item item1 = new Item();
        item1.setId(2L);
        item1.setImgurl(null);
        item1.setChapterNum(12);
        item1.setItemname("mock");
        item1.setMainAuthor("bamdb");
        item1.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item1.setType(0);
        itemClient.postItem(item1);
        mvc.perform(post("/add/itemid/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/itemid/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        if (ratingService.selectAll().iterator().hasNext()) {
            Long id = ratingService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(ratingService.selectById(id));
        }
        if (ratingService.selectAll().iterator().hasNext()) {
            Long itemId = ratingService.selectAll().iterator().next().getItemId();
            mvc.perform(delete("/delete/itemid/"+itemId))
                    .andExpect(status().isOk());
            Assert.assertNull(ratingService.selectByItemId(itemId));
        }
    }

    @TestConfiguration
    public static class LocalRibbonClientConfiguration {
        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", wiremock.port()));
        }
    }
}