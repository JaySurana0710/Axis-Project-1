package com.example.security.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.security.model.User;
import com.example.security.repository.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	@GetMapping("/getalluser")
	public ResponseEntity<List<User>> getAllUsers(){
		try {
			List<User> users = new ArrayList<>(userRepository.findAll());
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users,HttpStatus.OK);	
		}catch (Exception ex) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/getuser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") long id){
		Optional<User> userdata = userRepository.findById(id);
		if (userdata.isPresent()) {
			return new ResponseEntity<>(userdata.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}

	
	@PostMapping("/signin")
	public String validateUser(@RequestBody User user){
		try {
			User userData = userRepository.findUserByAccountNumber(user.getAccountNumber());

			if(user.getAccountNumber().equals(userData.getAccountNumber())){
				if (user.getPassword().equals(userData.getPassword())){
					return "valid";
				}
				else{
					return "incorrect password";
				}

			}
			else{
				return "no account found";
			}
		}
		catch (Exception e){
			return "no account found";
		}


	}

	@PostMapping("/create")
	public String createUser(@RequestBody User user) {
		//save() method
		try{
			userRepository.save(new User(user.getAccountNumber(),user.getPassword()));
			return "created";
		}catch (Exception e) {
			return "not created";
		}

	}
	@PutMapping("/updateuser/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") long id,@RequestBody User user) {
		Optional<User> userdata = userRepository.findById(id);
		if (userdata.isPresent()) {
			User _user = userdata.get();
			_user.setAccountNumber(user.getAccountNumber());
			_user.setPassword(user.getPassword());
			return new ResponseEntity<>(userRepository.save(_user),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	@DeleteMapping("/deleteuser/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
		try {
			userRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}catch(Exception ex) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
