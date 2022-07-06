package com.vms.user.repository;

import com.vms.model.user.Role;
import com.vms.model.user.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public interface UserSpecification {

	static Specification<User> searchUserSpecification(long companyId, String search) {
		return (root, cq, cb) -> {
			cq.distinct(true);
			List<Predicate> predicates = new ArrayList<>();
			predicates.add(cb.equal(root.get("company").get("id"), companyId));
			predicates.add(cb.equal(root.get("role"), Role.USER));
			String likeClause = "%" + search + "%";
			Expression<String> fullName = cb.concat(cb.concat(root.get("firstname"), " "), root.get("lastname"));
			predicates.add(cb.or(cb.like(root.get("username"), likeClause), cb.like(fullName, likeClause), cb.like(root.get("email"), likeClause)));

			return cb.and(predicates.toArray(new Predicate[]{}));
		};
	}
}
