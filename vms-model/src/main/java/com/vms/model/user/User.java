package com.vms.model.user;

import com.vms.model.application.Application;
import com.vms.model.company.Company;
import com.vms.model.configurable.Configurable;
import com.vms.model.group.Group;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
	@UniqueConstraint(columnNames = {"username"})
})
public class User extends Configurable {

	@Column(unique = true)
	private String username;

	@NotBlank(message = "Password cannot be blank")
	@NotEmpty(message = "Password cannot be empty")
	@NotNull(message = "Password cannot be null")
	private String password;

	private String firstname;

	private String lastname;

	@Column(unique = true)
	@Email
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

	@ManyToMany(mappedBy = "users")
	private List<Application> applications = new ArrayList<>();
}
