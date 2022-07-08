package com.vms.model.version;

import com.vms.model.configurable.Configurable;
import com.vms.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "comments")
public class Comment extends Configurable {

	@ManyToOne
	@JoinColumn(name = "version_id", nullable = false)
	private Version appVersion;

	@ManyToOne
	@JoinColumn(name = "author_id", nullable = false)
	private User author;

	private String text;

	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Comment parent;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "parent_id")
	private List<Comment> replies = new ArrayList<>();
}
