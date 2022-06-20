package com.vms.model.configurable;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public class Configurable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private Date createTime;

	private Date updateTime;

	@Version
	private long version;

	@PrePersist
	public void onCreate() {
		Date now = new Date();

		createTime = now;
		updateTime = now;
	}

	@PreUpdate
	public void onUpdate() {
		updateTime = new Date();
	}
}
