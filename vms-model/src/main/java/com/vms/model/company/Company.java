package com.vms.model.company;

import com.vms.model.configurable.Configurable;
import com.vms.model.group.Group;
import com.vms.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "companies", uniqueConstraints = {
	@UniqueConstraint(columnNames = "name")
})
public class Company extends Configurable {

	private String name;

	private String email;

	@OneToMany(mappedBy = "company")
	private List<User> users = new ArrayList<>();

	@OneToMany(mappedBy = "company")
	private List<Group> groups = new ArrayList<>();

	@ManyToMany
	@JoinTable(
		name = "company_vendors",
		joinColumns = @JoinColumn(name = "company_id"),
		inverseJoinColumns = @JoinColumn(name = "vendor_id")
	)
	private List<Company> vendors;

	@ManyToMany
	@JoinTable(
		name = "company_clients",
		joinColumns = @JoinColumn(name = "company_id"),
		inverseJoinColumns = @JoinColumn(name = "client_id")
	)
	private List<Company> clients;
}
