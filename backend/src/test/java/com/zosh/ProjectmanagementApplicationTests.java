package com.zosh;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "server.port=5054",
    "spring.application.name=PROJECT-MANAGEMENT-TEST",
    "spring.datasource.url=jdbc:mysql://localhost:3306/projectmanagment3",
    "spring.datasource.username=root",
    "spring.datasource.password=System",
    "spring.mail.username=dummy@example.com",
    "spring.mail.password=dummy",
    "razorpay.api.key=dummy-key",
    "razorpay.api.secret=dummy-secret"
})
class ProjectmanagementApplicationTests {

    @Test
    void contextLoads() {
        // Test if context loads
    }
}