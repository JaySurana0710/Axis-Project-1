package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    private RestTemplate restTemplate;
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee getEmployeeWithEmployeeId(int employeeId) {
        List<Employee> employeeList = getAllEmployees();
        for(Employee employee : employeeList){
            if(employee.getEmployeeId()==employeeId){
                return employee;
            }
        }
        return null;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }


    public ResponseEntity<HttpStatus> deleteEmployeeById(int id) {
        Employee employee = getEmployeeWithEmployeeId(id);
        if(employee!=null){
            employeeRepository.delete(employee);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public Employee updateEmployee(int employeeId,Employee employee) {

        //get the updated json from bank employee


        Employee _employee = getEmployeeWithEmployeeId(employeeId);
        if(employee != null) {
            _employee.setEmployeeId(employee.getEmployeeId());
            _employee.setEmployeeName(employee.getEmployeeName());
            _employee.setBranchId(employee.getBranchId());
            _employee.setAccountHolding(employee.getAccountHolding());
            _employee.setAccountNumber(employee.getAccountNumber());
        }

        //Here we can call a function which subtracts the paid salary
        // and then using getHoldings we can
        // subtract the holding with salary paid to update the bank holdings.

        employeeRepository.save(_employee);
        return employee;
    }
}
//    ResponseTemplate vo = new ResponseTemplate();
//    Employee employee =employeeRepository.findByEmployeeId(employeeId);
//    Bank bank = restTemplate.getForObject("http://BANK-SERVICE/findBank/"+bank.get)