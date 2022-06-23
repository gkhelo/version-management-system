package com.vms.company;

import com.vms.company.dto.CompanyDTO;
import com.vms.company.mapper.CompanyMapper;
import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.security.AuthService;
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
	private AuthService authService;

	@Autowired
	private VendorService vendorService;

	@Autowired
	private CompanyMapper companyMapper;

	@GetMapping("/all")
	public List<CompanyDTO> getVendors() {
		return companyMapper.toDTOs(vendorService.getVendors(getCompanyId()));
	}

	@PostMapping("/add/{vendorId}")
	public ResponseEntity<CompanyDTO> addVendor(@PathVariable("vendorId") long vendorId) {
		Company company = vendorService.addVendor(getCompanyId(), vendorId);
		return ResponseEntity.ok(companyMapper.toDTO(company));
	}

	@DeleteMapping("/delete/{vendorId}")
	public ResponseEntity<?> deleteVendor(@PathVariable("vendorId") long vendorId) {
		vendorService.deleteVendor(getCompanyId(), vendorId);
		return ResponseEntity.ok().build();
	}

	private long getCompanyId() {
		User user = authService.getAuthenticatedUser();
		return user.getCompany().getId();
	}
}
