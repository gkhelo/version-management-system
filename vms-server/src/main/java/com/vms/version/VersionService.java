package com.vms.version;

import com.vms.model.user.User;
import com.vms.model.version.Version;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface VersionService {

	Page<Version> getVersions(User user, Pageable pageable);

	Version getVersion(long versionId);

	Version addVersion(Version version, MultipartFile[] files);

	Resource getVersionFile(long versionId, String filename);
}
