package com.example.salary.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "salary")
public class Salary {
    @Id
    private String salaryId;
    private Long salaryAmount;
    private String salaryStatus;
    private String branchId;
    private int employeeId;
    private long ctc;
}
