package com.ankool.ecom_proj.config;

import com.ankool.ecom_proj.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//       Customizer<CsrfConfigurer<HttpSecurity>> CustCsrf =new Customizer<CsrfConfigurer<HttpSecurity>>() {
//           @Override
//           public void customize(CsrfConfigurer<HttpSecurity> Customizer ) {
//               Customizer.disable();
//           }
//       };
//        http.csrf(CustCsrf);
//                  |
//                  |
//        --------------------------------------------------------------------------------------------
//                  |
//                  V
//        http.csrf(Customizer -> Customizer.disable());

//        http.authorizeHttpRequests(requests -> requests.anyRequest().authenticated());
//        http.formLogin(Customizer.withDefaults());
//        http.httpBasic(Customizer.withDefaults());
//        http.sessionManagement(session ->
//                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

         return http
                .csrf(Customizer -> Customizer.disable())

//                .authorizeHttpRequests(
//                        requests -> requests.anyRequest().authenticated())

                 .authorizeHttpRequests(requests -> requests
                         .requestMatchers("/new/register").permitAll()
                         .requestMatchers(HttpMethod.POST, "/api/add")
                         .hasRole("ADMIN")
                         .requestMatchers(HttpMethod.PUT, "/api/product/**")
                         .hasRole("ADMIN")
                         .requestMatchers(HttpMethod.DELETE, "/api/product/**")
                         .hasRole("ADMIN")
                         .requestMatchers("/api/**")
                         .hasAnyRole("USER", "ADMIN")
                         .anyRequest().authenticated()
                 )
//                .formLogin(Customizer.withDefaults())  ---> login form when register removed for postman
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .build();
    }

//  this below makes it hardcoded for each user at login
//  we don't want hardcoded for each user we need it from Database

//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails user1= Users
//                .withDefaultPasswordEncoder()
//                .username("ank")
//                .password("123")
//                .roles("USER")
//                .build();
//
//        UserDetails user2= Users
//                .withDefaultPasswordEncoder()
//                .username("a")
//                .password("123")
//                .roles("admin")
//                .build();
//
//
//        return new InMemoryUserDetailsManager(user1, user2) ;
//    }



    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

//        provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));

        return provider;
    }
}
