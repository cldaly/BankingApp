package com.cldaly.BankingApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUserList();
	}
	
	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userService.saveUser(user);
	}
	
	@PostMapping("/users/authenticate")
	public User authenticateUser(@RequestParam("username") String username, @RequestParam("password") String password ) {
		return userService.authenticate(username, password);
	}
}
