package com.vms.version;

import com.vms.model.user.User;
import com.vms.model.version.Version;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VersionService {

	Page<Version> getVersions(User user, Pageable pageable);
}
