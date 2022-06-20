package com.vms.model.user;

import com.vms.model.configurable.Configurable;
import com.vms.model.company.Company;
import com.vms.model.group.Group;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"company_id", "username"})
})
public class User extends Configurable {

	private String username;

	@NotBlank(message = "Password cannot be blank")
	@NotEmpty(message = "Password cannot be empty")
	@NotNull(message = "Password cannot be null")
	private String password;

	private String firstname;

	private String lastname;

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
}