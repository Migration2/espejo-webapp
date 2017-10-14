package net.devcodes.webclient.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/rest/init")
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
}