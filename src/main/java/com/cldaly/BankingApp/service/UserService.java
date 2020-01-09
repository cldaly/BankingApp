package com.cldaly.BankingApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	// Get a user by id
	public Optional<User> getUserById(Long id) {
		return userRepo.findById(id);
	}
	
	// Get user by username
	public Optional<User> getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	
	// Get user by email
	public Optional<User> getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	
	// Get a list of all users
	public List<User> getUserList() {
		List<User> users = new ArrayList<User>();
		userRepo.findAll().forEach(users::add);
		return users;
	}
	
	// Add a new user to database
	public void saveUser(User user) throws AuthenticationException {
		if (getUserByUsername(user.getUsername()).isPresent()) {
			throw new AuthenticationException("Username already taken");
		}
		if (getUserByEmail(user.getEmail()).isPresent()) {
			throw new AuthenticationException("Email is already taken");
		}
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String hash = encoder.encode(user.getPassword());
		user.setPassword(hash);

		userRepo.save(user);
	}
	
}
