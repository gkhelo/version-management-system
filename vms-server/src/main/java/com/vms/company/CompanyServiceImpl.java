package com.vms.company;

import com.vms.company.repository.CompanyRepository;
import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
    private UserService userService;

	@Override
	public List<Company> getCompanies() {
		return companyRepository.findAll();
	}

	@Override
	public Company findById(long id) {
		Optional<Company> company = companyRepository.findById(id);
		if (company.isPresent()) {
			return company.get();
		}
		throw new VMSException(String.format("Company with id %d does not exist", id));
	}

	@Override
	@Transactional
	public Company addCompany(Company company, User admin) {
		try {
			company.getUsers().add(admin);
			company = companyRepository.save(company);

			admin.setCompany(company);
			userService.addUser(admin);

			return company;
		} catch (DataIntegrityViolationException ex) {
			throw new VMSException(String.format("Company with name %s already exists", company.getName()));
		}
	}
}