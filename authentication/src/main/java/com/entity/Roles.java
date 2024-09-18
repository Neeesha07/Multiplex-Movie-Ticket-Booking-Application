package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
	public class Roles {
	    @Id
	    @GeneratedValue
//	    @Column(name = "role_id")
	    private int id;
	    private String name;
	
	
	}

