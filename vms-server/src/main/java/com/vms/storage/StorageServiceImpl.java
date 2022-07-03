package com.vms.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class StorageServiceImpl implements StorageService {

	@Value("${app.versions.folder}")
	private String versionsFolder;

	@Override
	public List<String> saveFiles(long versionId, MultipartFile[] files) throws IOException {
		List<String> names = new ArrayList<>();

		File versionFolder = getVersionFolder(versionId);
		for (MultipartFile file : files) {
			File versionFile = new File(
				Path.of(versionFolder.getAbsolutePath(), file.getOriginalFilename()).toString()
			);
			file.transferTo(versionFile);

			names.add(file.getOriginalFilename());
		}

		return names;
	}

	private File getVersionFolder(long versionId) throws IOException {
		Path versionPath = Path.of(versionsFolder, "v" + versionId);
		File versionFolder = new File(versionPath.toString());

		if (!versionFolder.exists()) {
			Files.createDirectory(versionPath);
		}

		return versionFolder;
	}
}
