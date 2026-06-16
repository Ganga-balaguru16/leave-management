package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaveBalanceDto {

    private Long leaveTypeId;
    private String leaveTypeName;
    private Integer allowed;
    private Integer used;
}