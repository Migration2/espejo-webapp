package net.devcodes.webclient.security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

/**
 * Created by jialz on 7/19/2017.
 */
@Configuration
@EnableOAuth2Sso
@EnableOAuth2Client
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public static final Log LOG = LogFactory.getLog(SecurityConfig.class);

    /*@Bean
    public OAuth2RestOperations restTemplate(OAuth2ClientContext oauth2ClientContext) {
        return new OAuth2RestTemplate(remote(), oauth2ClientContext);
    }*/

    //Autowired
    //private OAuth2RestOperations oauth2RestTemplate;

    @Override
    public void configure(HttpSecurity http) throws Exception {

        LOG.info("METHOD: 'configure(HttpSecurity http)'");

        http.antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**", "/webjars/**", "/rest/init/me", "logout.html").permitAll()
                .anyRequest().authenticated()
                .and().exceptionHandling()
                .and().logout().logoutUrl("/logout").deleteCookies("JSESSIONID")
                .and().csrf().disable();
    }


    @Value("${oauth.resource:http://sercverUsingOAuth2}")
    private String baseUrl;

    @Value("${oauth.authorize:http://sercverUsingOAuth2/rest/oauth/token}")
    private String authorizeUrl;

    @Value("${oauth.token:http://sercverUsingOAuth2/rest/oauth/token}")
    private String tokenUrl;
}