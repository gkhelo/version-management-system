package com.vms.model.application;

import com.vms.model.company.Company;
import com.vms.model.configurable.Configurable;
import com.vms.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "applications")
public class Application extends Configurable {

	private String name;

	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
	private Company company;

	@ManyToOne
	@JoinColumn(name = "vendor_id", nullable = false)
	private Company vendor;

	@ManyToMany
	@JoinTable(
		name = "application_users",
		joinColumns = @JoinColumn(name = "application_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> users;
}
