package com.example.salary.controller;

import com.example.salary.VO.ResponseTemplate;
import com.example.salary.entity.Salary;
import com.example.salary.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/salary")
public class SalaryController {

    @Autowired
    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @PostMapping("/save")
    public Salary saveSalary(@RequestBody Salary salary) {
        return salaryService.saveSalary(salary);
    }

    @GetMapping("/getallsalary")
    public List<Salary> getAllSalarys() {
        return salaryService.getAllSalarys();
    }

    @GetMapping("/getsalaryof/{id}")
    public ResponseTemplate getSalaryBankEmployee(@PathVariable("id") String salaryId) {
        return salaryService.getSalaryWithBankEmployee(salaryId);
    }
    @GetMapping("/getsalaryby/{id}")
    public Salary getSalaryById(@PathVariable("id") String salaryId) {
        return salaryService.getSalaryById(salaryId);
    }

    @PutMapping("/pay/{id}")
    public Salary updateSalaryById(@PathVariable("id") String salaryId) {
        ResponseEntity<ResponseTemplate> vo1 = salaryService.updateSalary(salaryId);
        return vo1.getBody().getSalary();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") String salaryId) {
        return salaryService.deleteSalaryById(salaryId);
    }
}