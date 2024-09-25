package com.multiplex.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.multiplex.entity.Multiplex;
import com.multiplex.entity.MultiplexOwner;

@Repository
public interface MultiplexOwnerRepo extends JpaRepository<MultiplexOwner, Long>{

}
