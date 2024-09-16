package com.service;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;


public interface MultiplexDAO {
	public void addMultiplex(long owner_id, Multiplex multiplex);
	
	public void addOwner(MultiplexOwner owner);

}
