package com.example.employee.controller;

import com.example.employee.entity.Employee;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public Employee saveEmployee(@RequestBody Employee employee){ return employeeService.saveEmployee(employee);}

    @GetMapping("/findEmployee/{id}")
    public Employee getEmployeeWithEmployeeId(@PathVariable("id") int employeeId){
        return employeeService.getEmployeeWithEmployeeId(employeeId);
    }
    @PutMapping("/updateEmployee/{id}")
    public Employee updateEmployee(@PathVariable("id") int employeeId, @RequestBody Employee employee){
        return employeeService.updateEmployee(employeeId,employee);
    }

    @GetMapping("/findEmployees")
    public List<Employee> getallEmployee(){
        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus>deleteEmployeeById(@PathVariable("id") int id){
        return employeeService.deleteEmployeeById(id);
    }

}
