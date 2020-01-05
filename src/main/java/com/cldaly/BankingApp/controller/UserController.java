package com.cldaly.BankingApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cldaly.BankingApp.model.RegisterStatus;
import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.model.UsernamePassword;
import com.cldaly.BankingApp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/users/{id}")
	public Optional<User> getUsersById(@PathVariable("id") Long id) {
		return userService.getUserById(id);
	}
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUserList();
	}
	
	@PostMapping("/users")
	public RegisterStatus addUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PostMapping("/users/authenticate")
	public User authenticateUser(@RequestBody UsernamePassword input) {
		return userService.authenticate(input.getUsername(), input.getPassword());
	}

}
