package com.vms.user.repository;

import com.vms.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	Optional<User> findByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.company.id = :companyId")
	Page<User> findAllByCompany(@Param("companyId") long companyId, Pageable paging);

	@Query("SELECT u FROM User u WHERE u.company.id = :companyId AND u.id IN (:userIds)")
	List<User> findUsersByCompanyAndIds(@Param("companyId") long companyId, @Param("userIds") List<Long> userIds);
}
