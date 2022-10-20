package com.example.Bank.controller;




import com.example.Bank.entity.Bank;
import com.example.Bank.service.BankService;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/bank")
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping("/add")
    public Bank saveBank(@RequestBody Bank bank){
        return bankService.saveBank(bank);
    }

    @PutMapping("/updateHolding/{id}")
    public Bank updateBankById(@PathVariable("id") String id,@RequestBody Bank bank){
        return bankService.updateBankById(id,bank);
    }

    @GetMapping("/findBranch")
    public List<Bank> getAllBank(){
        return bankService.getAllBanks();
    }

    @GetMapping("/findBranch/{id}")
    public Bank getBankById(@PathVariable("id") String id){
        return bankService.getBankById(id);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<HttpStatus> deleteBankById(@PathVariable("id") String id){
        return bankService.deleteBankById(id);
    }


}
