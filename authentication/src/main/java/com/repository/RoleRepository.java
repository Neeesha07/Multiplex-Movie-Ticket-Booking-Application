package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Roles;

public interface RoleRepository extends JpaRepository<Roles, Integer> {

}
