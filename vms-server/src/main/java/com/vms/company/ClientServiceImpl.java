package com.vms.company;

import com.vms.model.company.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

	@Autowired
	private CompanyService companyService;

	@Override
	public List<Company> getClients(long companyId) {
		Company company = companyService.findById(companyId);
		company.getClients().size(); // initialize clients
		return company.getClients();
	}
}
