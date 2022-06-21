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
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ClientServiceImplTest {

	@Mock
	private CompanyService companyService;

	@InjectMocks
	private ClientServiceImpl service;

	@Test
	public void test_get_clients_with_invalid_company_id() {
		when(companyService.findById(1L)).thenThrow(new VMSException("Company with id 1 does not exist"));

		VMSException exception = assertThrows(VMSException.class, () -> service.getClients(1L));
		assertEquals("Company with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_get_empty_clients() {
		Company company = new Company();
		company.setClients(new ArrayList<>());

		when(companyService.findById(1L)).thenReturn(company);

		assertEquals(0, service.getClients(1L).size());
	}

	@Test
	public void test_get_multiple_clients() {
		int numClients = 3;

		List<Company> clients = new ArrayList<>();
		for (int i = 0; i < numClients; i++) {
			Company client = new Company();
			client.setId(i);
			client.setName(format("Client_%d", i));

			clients.add(client);
		}

		Company company = new Company();
		company.setClients(clients);

		when(companyService.findById(1L)).thenReturn(company);

		List<Company> actualClients = service.getClients(1L);
		assertEquals(numClients, actualClients.size());
		for (int i = 0; i < numClients; i++) {
			Company expected = clients.get(i);
			Company actual = clients.get(i);

			assertEquals(expected.getId(), actual.getId());
			assertEquals(expected.getName(), actual.getName());
		}
	}
}
