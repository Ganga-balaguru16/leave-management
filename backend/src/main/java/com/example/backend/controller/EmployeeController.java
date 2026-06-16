package com.example.backend.controller;

import com.example.backend.dto.LeaveBalanceDto;
import com.example.backend.dto.LeaveRequestDto;
import com.example.backend.entity.LeaveRequest;
import com.example.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/apply")
    public LeaveRequest applyLeave(
            @RequestParam Long employeeId,
            @RequestBody LeaveRequestDto dto) {

        return employeeService.applyLeave(
                employeeId,
                dto);
    }

    @GetMapping("/history")
    public List<LeaveRequest> leaveHistory(
            @RequestParam Long employeeId) {

        return employeeService
                .getLeaveHistory(employeeId);
    }

    @GetMapping("/balance")
    public List<LeaveBalanceDto> leaveBalance(
            @RequestParam Long employeeId) {

        return employeeService
                .getLeaveBalance(employeeId);
    }

    @PutMapping("/cancel/{id}")
    public String cancelLeave(
            @PathVariable Long id) {

        employeeService.cancelLeave(id);

        return "Leave Cancelled Successfully";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome Employee Dashboard";
    }
}