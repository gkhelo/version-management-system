package com.vms.company;

import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static java.lang.String.format;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class VendorServiceImplTest {

	@Mock
	private CompanyService companyService;

	@InjectMocks
	private VendorServiceImpl service;

	@Test
	public void test_get_vendors_with_invalid_company_id() {
		when(companyService.findById(1L)).thenThrow(new VMSException("Company with id 1 does not exist"));

		VMSException exception = assertThrows(VMSException.class, () -> service.getVendors(1L));
		assertEquals("Company with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_get_empty_vendors() {
		Company company = new Company();
		company.setVendors(new ArrayList<>());

		when(companyService.findById(1L)).thenReturn(company);

		assertEquals(0, service.getVendors(1L).size());
	}

	@Test
	public void test_get_multiple_vendors() {
		int numVendors = 3;

		List<Company> vendors = new ArrayList<>();
		for (int i = 0; i < numVendors; i++) {
			Company vendor = new Company();
			vendor.setId(i);
			vendor.setName(format("Vendor_%d", i));

			vendors.add(vendor);
		}

		Company company = new Company();
		company.setVendors(vendors);

		when(companyService.findById(1L)).thenReturn(company);

		List<Company> actualVendors = service.getVendors(1L);
		assertEquals(numVendors, actualVendors.size());
		for (int i = 0; i < numVendors; i++) {
			Company expected = vendors.get(i);
			Company actual = vendors.get(i);

			assertEquals(expected.getId(), actual.getId());
			assertEquals(expected.getName(), actual.getName());
		}
	}

	@Test
	public void test_add_vendor_with_invalid_company_id() {
		when(companyService.findById(1L)).thenThrow(new VMSException("Company with id 1 does not exist"));

		VMSException exception = assertThrows(VMSException.class, () -> service.addVendor(1L, 2L));
		assertEquals("Company with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_add_vendor_with_invalid_vendor_id() {
		when(companyService.findById(1L)).thenReturn(new Company());
		when(companyService.findById(2L)).thenThrow(new VMSException("Company with id 1 does not exist"));

		VMSException exception = assertThrows(VMSException.class, () -> service.addVendor(1L, 2L));
		assertEquals("Company with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_add_vendor() {
		Company company = new Company();
		company.setId(1L);
		company.setVendors(new ArrayList<>());

		Company vendor = new Company();
		vendor.setId(2L);
		vendor.setClients(new ArrayList<>());

		when(companyService.findById(1L)).thenReturn(company);
		when(companyService.findById(2L)).thenReturn(vendor);

		when(companyService.saveCompany(any())).thenAnswer(returnsFirstArg());

		company = service.addVendor(1L, 2L);

		assertEquals(1, company.getVendors().size());
		assertEquals(1, vendor.getClients().size());

		assertEquals(2L, company.getVendors().get(0).getId());
		assertEquals(1L, vendor.getClients().get(0).getId());
	}
}
