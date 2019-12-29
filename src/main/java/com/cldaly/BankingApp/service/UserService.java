package com.cldaly.BankingApp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	// Get a list of all users
	public List<User> getUserList() {
		List<User> users = new ArrayList<User>();
		userRepo.findAll().forEach(users::add);
		return users;
	}
	
	// Add a new user to database
	public void saveUser(User user) {
		userRepo.save(user);
	}
	
	// authenticate user
	public User authenticate(String username, String password){
		List<User> users = this.getUserList();
		for (User u : users) {
			if (u.getUsername().equals(username) && u.getPassword().equals(password)) {
				u.setToken("access-token");
				return u;
			}
		}
		return null;
	}
}
