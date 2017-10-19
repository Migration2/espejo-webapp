package net.devcodes.webclient.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by jialz on 7/20/2017.
 */

@RestController
@RequestMapping("/init")
public class PrincipalRest {

  @GetMapping("/me")
  public ResponseEntity<Map<String, String>> getPrincipal(Principal principal) {
    Map<String, String> map = new LinkedHashMap<>();

    if (principal != null) {
      map.put("name", principal.getName());
    } else {
      map.put("name", "anonimo");
    }
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/me/roles")
  public ResponseEntity<UserDetails> me(Principal principal) {
    if (principal != null) {
      Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
      System.out.println(loggedInUser.getAuthorities());
      return new ResponseEntity(loggedInUser.getAuthorities(), HttpStatus.OK);
    } else {
      return new ResponseEntity(HttpStatus.OK);
    }

  }
}
