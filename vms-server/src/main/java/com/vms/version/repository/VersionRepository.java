package com.vms.version.repository;

import com.vms.model.version.Version;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VersionRepository extends JpaRepository<Version, Long> {

	@Query
	List<Version> findByApplicationIdIn(List<Long> applicationIds);
}
