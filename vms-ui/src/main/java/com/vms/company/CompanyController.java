package com.vms.company;

import com.vms.company.dto.CompanyDTO;
import com.vms.company.mapper.CompanyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/companies")
@Secured("ADMIN")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/all")
    public List<CompanyDTO> getAllCompanies() {
        return CompanyMapper.INSTANCE.toDTOs(companyService.getCompanies());
    }
}