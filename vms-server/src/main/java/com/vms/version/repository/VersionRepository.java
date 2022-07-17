package com.vms.version.repository;

import com.vms.model.version.Version;
import com.vms.model.version.VersionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VersionRepository extends PagingAndSortingRepository<Version, Long> {

	@Query
	Page<Version> findByApplicationIdIn(List<Long> applicationIds, Pageable pageable);

	@Query("SELECT v FROM Version v WHERE v.status = :status")
	Version findActiveVersion(@Param("status") VersionStatus status);
}
