package com.example.backend.repository;


import com.example.backend.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveTypeRepository
        extends JpaRepository<LeaveType, Long> {
}