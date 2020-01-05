package com.cldaly.BankingApp.model;

public class UsernamePassword {
	private String username;
	private String password;
	
	private UsernamePassword(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	private UsernamePassword() { }
	
	public String getUsername() { return username; }
	public String getPassword() { return password; }

	public void setUsername(String username) { this.username = username; }
	public void setPassword(String password) { this.password = password; }
	
}
