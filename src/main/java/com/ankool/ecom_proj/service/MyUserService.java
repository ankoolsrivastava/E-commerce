package com.ankool.ecom_proj.service;

import com.ankool.ecom_proj.model.UserPrincipal;
import com.ankool.ecom_proj.model.Users;
import com.ankool.ecom_proj.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user=repo.findByUsername(username);
        if(user==null){
            IO.print("Username not found");
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user) ;
    }
}
