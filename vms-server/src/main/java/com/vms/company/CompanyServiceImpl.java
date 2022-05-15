package com.vms.company;

import com.vms.company.repository.CompanyRepository;
import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

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
}