package com.example.backend.service;


import com.example.backend.entity.Department;
import com.example.backend.entity.Employee;
import com.example.backend.entity.LeaveType;
import com.example.backend.repository.DepartmentRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.LeaveTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final PasswordEncoder passwordEncoder;

    // Employee CRUD

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee) {

        employee.setPassword(
                passwordEncoder.encode(employee.getPassword())
        );

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employee) {

        Employee emp = employeeRepository.findById(id)
                .orElseThrow();

        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setEmail(employee.getEmail());
        emp.setDesignation(employee.getDesignation());

        return employeeRepository.save(emp);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // Department CRUD

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department addDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(
            Long id,
            Department department) {

        Department dept = departmentRepository.findById(id)
                .orElseThrow();

        dept.setDepartmentName(
                department.getDepartmentName());

        dept.setDescription(
                department.getDescription());

        return departmentRepository.save(dept);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    // Leave Type CRUD

    public List<LeaveType> getAllLeaveTypes() {
        return leaveTypeRepository.findAll();
    }

    public LeaveType addLeaveType(
            LeaveType leaveType) {

        return leaveTypeRepository.save(leaveType);
    }

    public LeaveType updateLeaveType(
            Long id,
            LeaveType leaveType) {

        LeaveType lt =
                leaveTypeRepository.findById(id)
                        .orElseThrow();

        lt.setLeaveName(
                leaveType.getLeaveName());

        lt.setDescription(
                leaveType.getDescription());

        lt.setMaxDays(
                leaveType.getMaxDays());

        return leaveTypeRepository.save(lt);
    }

    public void deleteLeaveType(Long id) {
        leaveTypeRepository.deleteById(id);
    }
}