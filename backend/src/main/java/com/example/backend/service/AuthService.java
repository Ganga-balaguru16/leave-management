package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.entity.Employee;
import com.example.backend.entity.Role;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public Employee register(RegisterRequest request) {


        Employee employee = new Employee();

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setDesignation(request.getDesignation());
        employee.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        Role role = roleRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        employee.setRole(role);
        return employeeRepository.save(employee);
    }

    public LoginResponse login(LoginRequest request) {

        Employee employee = employeeRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                employee.getPassword())) {

            throw new RuntimeException("Invalid Credentials");
        }

        String token =
                jwtUtil.generateToken(employee.getEmail());

        return new LoginResponse(
                employee.getId(),
                token,
                employee.getRole().getRoleName(),
                employee.getFirstName()
        );
    }
}