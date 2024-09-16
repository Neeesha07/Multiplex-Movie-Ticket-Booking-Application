package com.service;

import com.entity.Multiplex;
import com.entity.MultiplexOwner;

public interface MultiplexDao {
	public void addMultiplexOwner(MultiplexOwner multiplexOwner);
	public void addMultiplex(Multiplex multiplex);
}
