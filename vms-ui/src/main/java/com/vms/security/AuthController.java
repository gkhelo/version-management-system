package com.vms.security;

import com.vms.company.CompanyService;
import com.vms.company.mapper.CompanyMapper;
import com.vms.exceptions.VMSException;
import com.vms.model.company.Company;
import com.vms.model.security.CustomUserDetails;
import com.vms.model.user.User;
import com.vms.security.dto.AuthRequest;
import com.vms.security.dto.AuthResponse;
import com.vms.security.dto.RegisterRequest;
import com.vms.user.UserService;
import com.vms.user.mapper.UserMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${jwt.expiry:86400}")
    private long expiry;

    @Autowired
    private Logger log;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = ((CustomUserDetails) authentication.getPrincipal()).getUser();

            Instant now = Instant.now();
            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("com.vms")
                    .issuedAt(now)
                    .expiresAt(now.plusSeconds(expiry))
                    .subject(String.valueOf(user.getId()))
                    .claim("role", user.getRole().name())
                    .build();

            String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

            log.info("Successfully authenticated {}", user.getUsername());
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(new AuthResponse(userMapper.toDTO(user)));
        } catch (BadCredentialsException ex) {
            log.error("Unsuccessful authentication, bad credentials for {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        try {
            Company company = companyMapper.fromDTO(request.getCompany());
            User admin = userMapper.fromDTO(request.getAdmin());

            companyService.addCompany(company, admin);

            return ResponseEntity.ok().build();
        } catch (VMSException ex) {
            log.error("Error occurred while trying to register new company: {}", ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/authenticated/{jwt}")
    public ResponseEntity<AuthResponse> getAuthenticatedUser(@PathVariable(name = "jwt") String jwtToken) {
        try {
            Jwt jwt = jwtDecoder.decode(jwtToken);
            if (Objects.requireNonNull(jwt.getExpiresAt()).isBefore(Instant.now())) {
                throw new JwtException("Token expired");
            }

            long userId = Long.parseLong(jwt.getSubject());
            User user = userService.getUserById(userId);

            return ResponseEntity.ok(new AuthResponse(userMapper.toDTO(user)));
        } catch (Exception ex) {
            log.error("Error occurred while trying to get authenticated user: {}", ex.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}