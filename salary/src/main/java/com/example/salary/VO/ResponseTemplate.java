package com.example.salary.VO;

import com.example.salary.entity.Salary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseTemplate {
    private Salary salary;
    private Bank bank;
    private Employee employee;
}
