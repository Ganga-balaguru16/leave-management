package com.example.backend.controller;


import com.example.backend.entity.Department;
import com.example.backend.entity.Employee;
import com.example.backend.entity.LeaveType;
import com.example.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // Employee APIs

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return adminService.getAllEmployees();
    }

    @PostMapping("/employees")
    public Employee addEmployee(
            @RequestBody Employee employee) {

        return adminService.addEmployee(employee);
    }

    @PutMapping("/employees/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return adminService.updateEmployee(
                id,
                employee);
    }

    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(
            @PathVariable Long id) {

        adminService.deleteEmployee(id);

        return "Employee Deleted";
    }

    // Department APIs

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return adminService.getAllDepartments();
    }

    @PostMapping("/departments")
    public Department addDepartment(
            @RequestBody Department department) {

        return adminService.addDepartment(department);
    }

    @PutMapping("/departments/{id}")
    public Department updateDepartment(
            @PathVariable Long id,
            @RequestBody Department department) {

        return adminService.updateDepartment(
                id,
                department);
    }

    @DeleteMapping("/departments/{id}")
    public String deleteDepartment(
            @PathVariable Long id) {

        adminService.deleteDepartment(id);

        return "Department Deleted";
    }

    // Leave Type APIs

    @GetMapping("/leave-types")
    public List<LeaveType> getLeaveTypes() {
        return adminService.getAllLeaveTypes();
    }

    @PostMapping("/leave-types")
    public LeaveType addLeaveType(
            @RequestBody LeaveType leaveType) {

        return adminService.addLeaveType(leaveType);
    }

    @PutMapping("/leave-types/{id}")
    public LeaveType updateLeaveType(
            @PathVariable Long id,
            @RequestBody LeaveType leaveType) {

        return adminService.updateLeaveType(
                id,
                leaveType);
    }

    @DeleteMapping("/leave-types/{id}")
    public String deleteLeaveType(
            @PathVariable Long id) {

        adminService.deleteLeaveType(id);

        return "Leave Type Deleted";
    }
}