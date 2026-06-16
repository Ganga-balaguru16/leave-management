package com.example.backend.controller;


import com.example.backend.entity.LeaveRequest;
import com.example.backend.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping("/pending")
    public List<LeaveRequest> pendingRequests() {
        return managerService.getPendingRequests();
    }

    @PutMapping("/approve/{id}")
    public LeaveRequest approveLeave(
            @PathVariable Long id) {

        return managerService.approveLeave(id);
    }

    @PutMapping("/reject/{id}")
    public LeaveRequest rejectLeave(
            @PathVariable Long id) {

        return managerService.rejectLeave(id);
    }

    @GetMapping("/calendar")
    public List<LeaveRequest> getCalendarLeaves() {
        return managerService.getApprovedLeaves();
    }
}