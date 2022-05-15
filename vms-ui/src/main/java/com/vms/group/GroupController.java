package com.vms.group;

import com.vms.group.dto.GroupDTO;
import com.vms.group.mapper.GroupMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@Secured("ADMIN")
@Tag(name = "Groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/all")
    public List<GroupDTO> getAllGroups() {
        return GroupMapper.INSTANCE.toDTOs(groupService.getGroups());
    }
}