package com.example.security.model;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@Column(unique=true)
	private String accountNumber;
	@Column(name="password")
	private String password;
	
	//Default Constructor
	public User(){
		
	}
	
	//Param constructor
	public User(String accountNumber,String password){
		super();
		this.accountNumber = accountNumber;
		this.password = password;
	}
	
	//setters and getters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
