package com.vms.user.repository;

import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

	Optional<User> findByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.company.id = :companyId")
	Page<User> findAllByCompany(@Param("companyId") long companyId, Pageable paging);

	@Query("SELECT u FROM User u LEFT JOIN u.applications a WHERE a.id = :applicationId AND u.company.id = :companyId")
	List<User> getUsersByApplicationAndCompanyId(@Param("applicationId") long applicationId, @Param("companyId") long companyId);
}
