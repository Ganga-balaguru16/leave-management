package com.example.backend.service;


import com.example.backend.dto.LeaveBalanceDto;
import com.example.backend.dto.LeaveRequestDto;
import com.example.backend.entity.Employee;
import com.example.backend.entity.LeaveRequest;
import com.example.backend.entity.LeaveType;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.LeaveRequestRepository;
import com.example.backend.repository.LeaveTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveTypeRepository leaveTypeRepository;

    /*public LeaveRequest applyLeave(
            Long employeeId,
            LeaveRequestDto dto) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow();

        LeaveType leaveType = leaveTypeRepository
                .findById(dto.getLeaveTypeId())
                .orElseThrow();

        LeaveRequest leaveRequest = new LeaveRequest();

        leaveRequest.setEmployee(employee);
        leaveRequest.setLeaveType(leaveType);
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());

        long days = ChronoUnit.DAYS.between(
                dto.getStartDate(),
                dto.getEndDate()) + 1;

        leaveRequest.setNumberOfDays((int) days);
        leaveRequest.setReason(dto.getReason());
        leaveRequest.setStatus("PENDING");
        leaveRequest.setAppliedDate(LocalDate.now());

        return leaveRequestRepository.save(leaveRequest);
    }*/
    public LeaveRequest applyLeave(
            Long employeeId,
            LeaveRequestDto dto) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow();

        LeaveType leaveType = leaveTypeRepository
                .findById(dto.getLeaveTypeId())
                .orElseThrow();

        if (dto.getStartDate() == null ||
                dto.getEndDate() == null ||
                dto.getReason() == null ||
                dto.getReason().isBlank()) {

            throw new RuntimeException("All fields are required");
        }

        LeaveRequest leaveRequest = new LeaveRequest();

        leaveRequest.setEmployee(employee);
        leaveRequest.setLeaveType(leaveType);
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());

        long days = ChronoUnit.DAYS.between(
                dto.getStartDate(),
                dto.getEndDate()) + 1;

        leaveRequest.setNumberOfDays((int) days);

        // MISSING LINES
        leaveRequest.setReason(dto.getReason());
        leaveRequest.setStatus("PENDING");
        leaveRequest.setAppliedDate(LocalDate.now());

        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeaveHistory(
            Long employeeId) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow();

        return leaveRequestRepository
                .findByEmployee(employee);
    }

    /*
    public Integer getLeaveBalance(Long employeeId) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow();

        return employee.getLeaveBalance();
    }
    */

    public List<LeaveBalanceDto> getLeaveBalance(Long employeeId) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        List<LeaveRequest> requests =
                leaveRequestRepository.findByEmployee(employee);

        List<LeaveType> leaveTypes =
                leaveTypeRepository.findAll();

        return leaveTypes.stream()
                .map(type -> {

                    int used = requests.stream()
                            .filter(r ->
                                    r.getLeaveType()
                                            .getId()
                                            .equals(type.getId()))
                            .filter(r ->
                                    "APPROVED"
                                            .equals(r.getStatus()))
                            .mapToInt(
                                    LeaveRequest::getNumberOfDays)
                            .sum();

                    return new LeaveBalanceDto(
                            type.getId(),
                            type.getLeaveName(),
                            type.getMaxDays(),
                            used
                    );
                })
                .toList();
    }

    public void cancelLeave(Long leaveId) {

        LeaveRequest leaveRequest =
                leaveRequestRepository
                        .findById(leaveId)
                        .orElseThrow();

        leaveRequest.setStatus("CANCELLED");

        leaveRequestRepository.save(leaveRequest);
    }
}