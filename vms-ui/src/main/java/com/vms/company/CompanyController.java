package com.vms.company;

import com.vms.company.dto.CompanyDTO;
import com.vms.company.mapper.CompanyMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@Secured("ADMIN")
@Tag(name = "Companies")
@SecurityRequirement(name = "bearerAuth")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/all")
    public List<CompanyDTO> getAllCompanies() {
        return CompanyMapper.INSTANCE.toDTOs(companyService.getCompanies());
    }
}