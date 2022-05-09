package com.vms.model.company;

import com.vms.model.configurable.Configurable;
import com.vms.model.group.Group;
import com.vms.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "companies")
public class Company extends Configurable {

    private String name;

    private String email;

    @OneToMany(mappedBy = "company")
    private List<User> users;

    @OneToMany(mappedBy = "company")
    private List<Group> groups;
}