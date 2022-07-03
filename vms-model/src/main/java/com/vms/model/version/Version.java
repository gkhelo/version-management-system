package com.vms.model.version;

import com.vms.model.application.Application;
import com.vms.model.configurable.Configurable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "versions")
public class Version extends Configurable {

	private String description;

	@ManyToOne
	@JoinColumn(name = "application_id", nullable = false)
	private Application application;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "version_files", joinColumns = @JoinColumn(name = "version_id"))
	@Column(name = "filename")
	private List<String> filenames;
}
