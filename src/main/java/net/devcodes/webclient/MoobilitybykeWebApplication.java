package net.devcodes.webclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

@EnableZuulProxy
@SpringBootApplication
public class MoobilitybykeWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoobilitybykeWebApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean someFilterRegistration() {

        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new LogoutFilter());
        registration.addUrlPatterns("/logout");
        registration.addInitParameter("paramName", "paramValue");
        registration.setName("LogoutFilter");
        registration.setOrder(-20);
        return registration;
    }
}
