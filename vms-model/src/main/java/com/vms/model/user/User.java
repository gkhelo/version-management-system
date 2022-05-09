package com.vms.model.user;

import com.vms.model.configurable.Configurable;
import com.vms.model.company.Company;
import com.vms.model.group.Group;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends Configurable {

    private String username;

    private String password;

    private String firstname;

    private String lastname;

    private String email;

    private boolean passwordChangeRequired;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToMany
    @JoinTable(
            name = "user_groups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;
}