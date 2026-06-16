package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "leave_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leaveName;

    private String description;

    private Integer maxDays;
}