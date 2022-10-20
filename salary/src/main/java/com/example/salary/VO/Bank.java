package com.example.salary.VO;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bank")
public class Bank {
    @Id
    private String branchId;
    private String bankName;
    private String branchName;
    private long branchHolding;
}
