package com.vms.company;

import com.vms.model.company.Company;

import java.util.List;

public interface VendorService {

	List<Company> getVendors(long companyId);

	Company addVendor(long companyId, long vendorId);

	void deleteVendor(long companyId, long vendorId);
}
