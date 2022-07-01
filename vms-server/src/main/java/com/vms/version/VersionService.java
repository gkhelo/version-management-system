package com.vms.version;

import com.vms.model.user.User;
import com.vms.model.version.Version;

import java.util.List;

public interface VersionService {

	List<Version> getVersions(User user);
}
