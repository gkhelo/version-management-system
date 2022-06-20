package com.vms.model.group;

import com.vms.model.company.Company;
import com.vms.model.configurable.Configurable;
import com.vms.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "groups")
public class Group extends Configurable {

	private String name;

	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
	private Company company;

	@ManyToMany(mappedBy = "groups")
	private List<User> users;
}
