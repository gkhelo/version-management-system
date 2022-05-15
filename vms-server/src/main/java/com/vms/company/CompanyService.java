package com.vms.company;

import com.vms.model.company.Company;

import java.util.List;

public interface CompanyService {

    List<Company> getCompanies();

    Company findById(long id);
}