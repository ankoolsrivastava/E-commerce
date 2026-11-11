package com.ankool.ecom_proj.controller;

import com.ankool.ecom_proj.model.Users;
import com.ankool.ecom_proj.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/new")
public class UserController {
    @Autowired
    private MyUserService myUserService;

    @PostMapping("/register")
    public ResponseEntity<Users> register (@RequestBody Users user) {
        return new ResponseEntity<>(myUserService.register(user),HttpStatus.OK );
    }
}
