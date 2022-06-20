package com.vms.group;

import com.vms.group.repository.GroupRepository;
import com.vms.model.group.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Override
	public List<Group> getGroups() {
		return groupRepository.findAll();
	}
}
