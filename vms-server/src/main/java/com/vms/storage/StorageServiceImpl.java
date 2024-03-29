package com.vms.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
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

	@Override
	public Resource getFile(long versionId, String filename) throws IOException {
		File versionFolder = getVersionFolder(versionId);
		File versionFile = new File(Path.of(versionFolder.getAbsolutePath(), filename).toUri());
		if (!versionFile.exists()) {
			throw new FileNotFoundException(filename + " not exists");
		}
		return new UrlResource(Path.of(versionFolder.getAbsolutePath(), filename).toUri());
	}

	@Override
	public void deleteFile(long versionId, String filename) throws IOException {
		File versionFolder = getVersionFolder(versionId);
		Files.deleteIfExists(Path.of(versionFolder.getAbsolutePath(), filename));
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
