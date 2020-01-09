package com.cldaly.BankingApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cldaly.BankingApp.model.CustomUserDetails;
import com.cldaly.BankingApp.model.User;
import com.cldaly.BankingApp.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepo.findByUsername(username);
		user.orElseThrow(() -> new UsernameNotFoundException("Bad Credentials"));
		return new CustomUserDetails(user.get());
	}

}
