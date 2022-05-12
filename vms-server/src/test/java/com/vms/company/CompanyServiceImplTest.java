package com.vms.company;

import com.vms.company.repository.CompanyRepository;
import com.vms.model.company.Company;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceImplTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyServiceImpl service;

    @Test
    public void test_empty_getCompanies() {
        when(companyRepository.findAll()).thenReturn(Collections.emptyList());

        List<Company> result = service.getCompanies();
        assertEquals(0, result.size());
    }

    @Test
    public void test_getCompanies() {
        int numCompanies = 5;
        String namePrefix = "name_";

        List<Company> companies = new ArrayList<>();
        for (int i = 0; i < numCompanies; i++) {
            Company company = new Company();
            company.setId(i);
            company.setName(namePrefix + i);

            companies.add(company);
        }

        when(companyRepository.findAll()).thenReturn(companies);
        List<Company> result = service.getCompanies();

        assertEquals(numCompanies, result.size());
        for (int i = 0; i < numCompanies; i++) {
            Company company = result.get(i);

            assertEquals(i, company.getId());
            assertEquals(namePrefix + i, company.getName());
        }
    }
}