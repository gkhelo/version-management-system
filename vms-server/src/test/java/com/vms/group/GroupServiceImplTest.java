package com.vms.group;

import com.vms.group.repository.GroupRepository;
import com.vms.model.group.Group;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GroupServiceImplTest {

	@Mock
	private GroupRepository groupRepository;

	@InjectMocks
	private GroupServiceImpl service;

	@Test
	public void test_empty_getGroups() {
		when(groupRepository.findAll()).thenReturn(Collections.emptyList());

		List<Group> result = service.getGroups();
		assertEquals(0, result.size());
	}

	@Test
	public void test_getGroups() {
		int numGroups = 5;
		String namePrefix = "name_";

		List<Group> groups = new ArrayList<>();
		for (int i = 0; i < numGroups; i++) {
			Group group = new Group();
			group.setId(i);
			group.setName(namePrefix + i);

			groups.add(group);
		}

		when(groupRepository.findAll()).thenReturn(groups);
		List<Group> result = service.getGroups();

		assertEquals(numGroups, result.size());
		for (int i = 0; i < numGroups; i++) {
			Group group = result.get(i);

			assertEquals(i, group.getId());
			assertEquals(namePrefix + i, group.getName());
		}
	}
}
