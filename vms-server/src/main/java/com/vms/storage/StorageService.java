package com.vms.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface StorageService {

	List<String> saveFiles(long versionId, MultipartFile[] files) throws IOException;
}
