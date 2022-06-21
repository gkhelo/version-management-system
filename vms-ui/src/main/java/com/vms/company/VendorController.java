package com.vms.company;

import com.vms.company.dto.CompanyDTO;
import com.vms.company.mapper.CompanyMapper;
import com.vms.model.company.Company;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@Secured("ADMIN")
@Tag(name = "Vendors")
@SecurityRequirement(name = "bearerAuth")
public class VendorController {

	@Autowired
	private VendorService vendorService;

	@Autowired
	private CompanyMapper companyMapper;

	@GetMapping("/all")
	public List<CompanyDTO> getVendors(@RequestParam long companyId) {
		return companyMapper.toDTOs(vendorService.getVendors(companyId));
	}

	@PostMapping("/add")
	public ResponseEntity<CompanyDTO> addVendor(@RequestParam long companyId,
												@RequestParam long vendorId) {
		Company company = vendorService.addVendor(companyId, vendorId);
		return ResponseEntity.ok(companyMapper.toDTO(company));
	}
}
