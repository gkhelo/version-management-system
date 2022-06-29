package com.vms.application.repository;

import com.vms.model.application.Application;
import com.vms.model.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

	@Query
	List<Application> findAllByCompany(Company company);

	@Query
	List<Application> findAllByVendor(Company vendor);

	@Query("SELECT a FROM Application a WHERE a.id = :applicationId AND (a.company.id = :companyId OR a.vendor.id = :companyId)")
	Application findByIdAndCompanyOrVendor(@Param("applicationId") long applicationId, @Param("companyId") long companyId);

	@Query("SELECT a FROM Application a WHERE a.id = :applicationId AND a.company.id = :companyId")
	Application findByIdAndCompany(@Param("applicationId") long applicationId, @Param("companyId") long companyId);

	@Query("SELECT a FROM Application a WHERE a.id = :applicationId AND a.vendor.id = :vendorId")
	Application findByIdAndVendor(@Param("applicationId") long applicationId, @Param("vendorId") long vendorId);
}
