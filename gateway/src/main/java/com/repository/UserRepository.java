package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {

	@Query("SELECT u FROM Users u WHERE u.username = ?1")
    public Users getUserByUsername( String username);
}
