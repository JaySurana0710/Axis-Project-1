package com.example.salary.service;

import com.example.salary.VO.Bank;
import com.example.salary.VO.Employee;
import com.example.salary.VO.ResponseTemplate;
import com.example.salary.entity.Salary;
import com.example.salary.repository.SalaryRepository;
import com.example.salary.utility.PaySalary;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class SalaryService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PaySalary paySalary;

    @Autowired
    private SalaryRepository salaryRepository;

    public SalaryService (SalaryRepository salaryRepository) {this.salaryRepository = salaryRepository;}
    public Salary saveSalary(Salary salary) {
        return salaryRepository.save(salary);
    }

    public List<Salary> getAllSalarys() {
        return salaryRepository.findAll();
    }

    public Salary getSalaryById(String salaryId) {
        List<Salary> salaries = getAllSalarys();
        for (Salary salary : salaries){
            if (salary.getSalaryId().equals(salaryId)){
                return salary;
            }
        }
        return null;
    }

    public ResponseTemplate getSalaryWithBankEmployee(String salaryId) {
        Salary _salary = null;
        ResponseTemplate vo = new ResponseTemplate();
        Optional<Salary> salaryData = salaryRepository.findById(salaryId);
        if(salaryData.isPresent()){
            _salary = salaryData.get();
        }
        //System.out.println(salary);
        Bank bank = restTemplate.getForObject("http://BANK-SERVICE/bank/"+_salary.getBranchId(),Bank.class);
        Employee employee = restTemplate.getForObject("http://EMPLOYEE-SERVICE/employee/"+_salary.getEmployeeId(),Employee.class);
        vo.setSalary(_salary);
        vo.setBank(bank);
        vo.setEmployee(employee);
        return vo;
    }

    public ResponseEntity<ResponseTemplate> updateSalary(String salaryId) {
//        Salary _salary = getSalaryById(salaryId);
//        if(_salary!=null){
//            _salary.setSalaryAmount(salary.getSalaryAmount());
//            _salary.setSalaryStatus(salary.getSalaryStatus());
//            _salary.setBranchId(salary.getBranchId());
//            _salary.setEmployeeId(salary.getEmployeeId());
//            return new ResponseEntity<>(salaryRepository.save(_salary), HttpStatus.OK);
//        }
        ResponseTemplate vo = paySalary.paySalaryforEmployee(salaryId);
        if (vo==null){
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(vo,HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> deleteSalaryById(String salaryId) {
        Salary salary = getSalaryById(salaryId);
        if(salary!=null){
            salaryRepository.delete(salary);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
