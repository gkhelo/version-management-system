package com.vms.application.repository;

import com.vms.model.application.Application;
import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends PagingAndSortingRepository<Application, Long> {

	@Query("SELECT a FROM Application a WHERE a.company.id = :companyId OR a.vendor.id = :companyId")
	Page<Application> findAllByCompanyOrVendor(@Param("companyId") long companyId, Pageable pageable);

	@Query(value = "SELECT a FROM Application a JOIN a.users u WHERE u.id = :userId",
		countQuery = "SELECT COUNT(a) FROM Application a JOIN a.users u WHERE u.id = :userId")
	Page<Application> getUserApplications(@Param("userId") long userId, Pageable pageable);

	@Query("SELECT a FROM Application a JOIN a.users u WHERE a.id = :applicationId AND u.id = :userId")
	Application findByApplicationIdAndUser(@Param("applicationId") long applicationId, @Param("userId") long userId);

	@Query("SELECT a FROM Application a WHERE a.id = :applicationId AND (a.company.id = :companyId OR a.vendor.id = :companyId)")
	Application findByIdAndCompanyOrVendor(@Param("applicationId") long applicationId, @Param("companyId") long companyId);

	@Query("SELECT a FROM Application a LEFT JOIN FETCH a.users u WHERE a.id = :applicationId AND (a.company.id = :companyId OR a.vendor.id = :companyId)")
	Application findByIdAndCompanyOrVendorFetchUsers(@Param("applicationId") long applicationId, @Param("companyId") long companyId);

	@Query("SELECT u FROM Application a LEFT JOIN a.users u WHERE a.id = :applicationId AND u.company.id = :companyId")
	List<User> getUsersByApplicationAndCompanyId(@Param("applicationId") long applicationId, @Param("companyId") long companyId);
}
