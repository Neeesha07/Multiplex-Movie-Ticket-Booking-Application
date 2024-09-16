package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;

@Repository
public interface MultiplexOwnerRepo extends JpaRepository<MultiplexOwner, Long>{

}
