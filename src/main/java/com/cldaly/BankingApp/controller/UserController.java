package com.cldaly.BankingApp.controller;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cldaly.BankingApp.dto.AuthenticationRequest;
import com.cldaly.BankingApp.dto.AuthenticationResponse;
import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.service.MyUserDetailsService;
import com.cldaly.BankingApp.service.UserService;
import com.cldaly.BankingApp.util.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired 
	private MyUserDetailsService myUserDetailsService;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping
	public List<User> getUsers() {
		return userService.getUserList();
	}
	
	@PostMapping("/add")
	public void addUser(@RequestBody User user) throws AuthenticationException {
		userService.saveUser(user);
	}
	
	@GetMapping("/{id}")
	public Optional<User> getUsersById(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request) throws Exception {
		try {
			authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect Username or Password", e);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		final UserDetails userDetails = myUserDetailsService.loadUserByUsername(request.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

}
