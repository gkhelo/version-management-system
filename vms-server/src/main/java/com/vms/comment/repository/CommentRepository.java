package com.vms.comment.repository;

import com.vms.model.version.Comment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query
	List<Comment> findByAppVersionIdAndParentIsNull(long versionId, Sort sort);
}
