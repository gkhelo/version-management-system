package com.vms.company;

import com.vms.model.company.Company;

import java.util.List;

public interface ClientService {

	List<Company> getClients(long companyId);
}
