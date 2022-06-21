package com.vms.company;

import com.vms.model.company.Company;
import com.vms.model.user.User;

import java.util.List;

public interface CompanyService {

	List<Company> getCompanies();

	Company findById(long id);

	Company addCompany(Company company, User admin);

	Company saveCompany(Company company);
}
