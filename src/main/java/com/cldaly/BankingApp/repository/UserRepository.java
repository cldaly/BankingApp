package com.cldaly.BankingApp.repository;

import org.springframework.data.repository.CrudRepository;

import com.cldaly.BankingApp.model.User;

public interface UserRepository extends CrudRepository<User, Long> {}
