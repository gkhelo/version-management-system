package com.vms.company;

import com.vms.model.company.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VendorServiceImpl implements VendorService {

	@Autowired
	private CompanyService companyService;

	@Override
	public List<Company> getVendors(long companyId) {
		Company company = companyService.findById(companyId);
		company.getVendors().size(); // initialize vendors
		return company.getVendors();
	}

	@Override
	public Company addVendor(long companyId, long vendorId) {
		Company company = companyService.findById(companyId);
		Company vendor = companyService.findById(vendorId);

		vendor.getClients().add(company);
		vendor = companyService.saveCompany(vendor);

		company.getVendors().add(vendor);
		company = companyService.saveCompany(company);

		return company;
	}
}
