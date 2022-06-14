package com.vms.user;

import com.vms.model.user.User;
import com.vms.user.dto.UserDTO;
import com.vms.user.mapper.UserMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Secured("ADMIN")
@Tag(name = "Users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

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
		Page<User> userResult = userService.getUsers(paging);
		return new PageImpl<>(userMapper.toDTOs(userResult.getContent()), paging, userResult.getTotalElements());
	}

	@PostMapping("/add")
	public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
		User user = userMapper.fromDTO(userDTO);
		return new ResponseEntity<>(userMapper.toDTO(userService.addUser(user)), HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
		User user = userMapper.fromDTO(userDTO);
		return new ResponseEntity<>(userMapper.toDTO(userService.updateUser(user)), HttpStatus.OK);
	}

	@GetMapping("/get/{userId}")
	public UserDTO getUser(@PathVariable("userId") long userId) {
		return userMapper.toDTO(userService.getUser(userId));
	}

	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable("userId") long userId) {
		userService.deleteUser(userId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}