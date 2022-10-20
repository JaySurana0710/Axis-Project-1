package com.example.salary.utility;

import com.example.salary.VO.Bank;
import com.example.salary.VO.Employee;
import com.example.salary.VO.ResponseTemplate;
import com.example.salary.entity.Salary;
import com.example.salary.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Component
public class PaySalary {
    private Bank bank;
    private Employee employee;

    @Autowired
    private SalaryService salaryService;
    @Autowired
    private RestTemplate restTemplate;

    public PaySalary(){}
    public ResponseTemplate paySalaryforEmployee(String salaryId){

        ResponseTemplate responseTemplate = new ResponseTemplate();
        Salary salary = salaryService.getSalaryById(salaryId);

        //Get Employee and branch
        Employee employee1 = restTemplate.getForObject("http://EMPLOYEE-SERVICE/employee/findEmployee/"+salary.getEmployeeId(),Employee.class);
        Bank bank1 = restTemplate.getForObject("http://BANK-SERVICE/bank/findBranch/"+salary.getBranchId(),Bank.class);

        if(bank1.getBranchHolding()-(salary.getCtc()/12)<0){
            System.out.println("Balance Low");
            salary.setSalaryStatus("NOT ENOUGH BALANCE");
            salaryService.saveSalary(salary);
            responseTemplate.setBank(bank1);
            responseTemplate.setEmployee(employee1);
            responseTemplate.setSalary(salary);
            return responseTemplate;
        }

        //Update Accounts
        bank1.setBranchHolding(bank1.getBranchHolding()-(salary.getCtc()/12));
        employee1.setAccountHolding(employee1.getAccountHolding()+(salary.getCtc()/12));
        restTemplate.put("http://EMPLOYEE-SERVICE/employee/updateEmployee/"+employee1.getEmployeeId(),employee1,Employee.class);
        restTemplate.put("http://BANK-SERVICE/bank/updateHolding/"+bank1.getBranchId(),bank1,Bank.class);

        salary.setSalaryAmount((salary.getCtc()/12));
        salary.setEmployeeId(employee1.getEmployeeId());
        salary.setSalaryStatus("Paid");
        salary.setBranchId(bank1.getBranchId());

        salaryService.saveSalary(salary);

        responseTemplate.setBank(bank1);
        responseTemplate.setEmployee(employee1);
        responseTemplate.setSalary(salary);
        return responseTemplate;
    }
}
