package com.example.backend.service;


import com.example.backend.entity.LeaveRequest;
import com.example.backend.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final LeaveRequestRepository leaveRequestRepository;

    public List<LeaveRequest> getPendingRequests() {
        return leaveRequestRepository.findByStatus("PENDING");
    }

    public List<LeaveRequest> getApprovedLeaves() {
        return leaveRequestRepository.findByStatus("APPROVED");
    }

    public LeaveRequest approveLeave(Long id) {

        LeaveRequest leave =
                leaveRequestRepository.findById(id)
                        .orElseThrow();

        leave.setStatus("APPROVED");

        return leaveRequestRepository.save(leave);
    }

    public LeaveRequest rejectLeave(Long id) {

        LeaveRequest leave =
                leaveRequestRepository.findById(id)
                        .orElseThrow();

        leave.setStatus("REJECTED");

        return leaveRequestRepository.save(leave);
    }
}