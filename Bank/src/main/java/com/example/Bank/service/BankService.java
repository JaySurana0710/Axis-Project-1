package com.example.Bank.service;


import com.example.Bank.entity.Bank;
import com.example.Bank.repository.BankRepository;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BankService {
    @Autowired
    private final BankRepository bankRepository;


    public Bank saveBank(Bank bank) {
        return bankRepository.save(bank);
    }

    public Bank updateBankById(String id,Bank bank) {
        Bank _bank = getBankById(id);
        if(bank != null) {
            _bank.setBankName(bank.getBankName());
            _bank.setBranchName(bank.getBranchName());
            _bank.setBranchId(bank.getBranchId());
            _bank.setBranchHolding(bank.getBranchHolding());
        }



        //Get the updated json from pay-salary

        bankRepository.save(bank);
        return bank;
    }


    public Bank getBankById(String id) {
        List<Bank> bankList =getAllBanks();
        for(Bank bank : bankList){
            if(bank.getBranchId().equals(id)){
                return bank;
            }
        }
        return null;
    }

    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }


    public ResponseEntity<HttpStatus> deleteBankById(String id) {
        Bank bank = getBankById(id);
        if(bank!=null){
            bankRepository.delete(bank);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}