package com.vms.user;

import com.vms.model.company.Company;
import com.vms.model.user.User;
import com.vms.security.AuthService;
import com.vms.user.dto.RoleDTO;
import com.vms.user.dto.UserDTO;
import com.vms.user.mapper.UserMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Secured("ADMIN")
@Tag(name = "Users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserMapper userMapper;

	@GetMapping("/all")
	public Page<UserDTO> getAllUsers(@RequestParam(defaultValue = "0") Integer page,
									 @RequestParam(defaultValue = "10") Integer size,
									 @RequestParam(defaultValue = "id") String sortBy,
									 @RequestParam(defaultValue = "asc") String sortDirection) {
		Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
		Page<User> userResult = userService.getUsers(getCompany().getId(), paging);
		return new PageImpl<>(userMapper.toDTOs(userResult.getContent()), paging, userResult.getTotalElements());
	}

	@GetMapping("/search")
	public List<UserDTO> searchUsersNotInApplication(@RequestParam(defaultValue = "5") Integer maxResults,
									 @RequestParam long applicationId,
									 @RequestParam(defaultValue = "") String search) {
		List<User> userResult = userService.searchUsersNotInApplication(getCompany().getId(), applicationId, search, maxResults);
		return userMapper.toDTOs(userResult);
	}

	@PostMapping("/add")
	public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
		User user = userMapper.fromDTO(userDTO);
		return new ResponseEntity<>(userMapper.toDTO(userService.addUser(user, getCompany())), HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
		User user = userMapper.fromDTO(userDTO);
		return new ResponseEntity<>(userMapper.toDTO(userService.updateUser(user, getCompany().getId())), HttpStatus.OK);
	}

	@GetMapping("/get/{userId}")
	public UserDTO getUser(@PathVariable("userId") long userId) {
		return userMapper.toDTO(userService.getUser(userId, getCompany().getId()));
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable("userId") long userId) {
		userService.deleteUser(userId, getCompany().getId());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/roles")
	public RoleDTO[] getAllRoles() {
		return RoleDTO.values();
	}


	@Secured({"ADMIN"})
	@GetMapping("/application/{applicationId}")
	public List<UserDTO> getApplicationUsers(@PathVariable("applicationId") long applicationId) {
		return userMapper.toDTOs(userService.getApplicationUsers(applicationId, getCompany().getId()));
	}

	private Company getCompany() {
		User user = authService.getAuthenticatedUser();
		return user.getCompany();
	}
}
