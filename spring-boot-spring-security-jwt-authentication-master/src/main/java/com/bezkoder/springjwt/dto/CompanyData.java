package com.bezkoder.springjwt.dto;

public class CompanyData {

	private Long id;
	private Long userId;
    private String name;
    private String email;
    private String password;
    private Integer criteria;
    private String role;
    private Integer placedStudCount;
    private Integer appliedStudCount;
    
    public CompanyData() {
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getCriteria() {
		return criteria;
	}
	public void setCriteria(Integer criteria) {
		this.criteria = criteria;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

	public Integer getPlacedStudCount() {
		return placedStudCount;
	}

	public void setPlacedStudCount(Integer placedStudCount) {
		this.placedStudCount = placedStudCount;
	}

	public Integer getAppliedStudCount() {
		return appliedStudCount;
	}

	public void setAppliedStudCount(Integer appliedStudCount) {
		this.appliedStudCount = appliedStudCount;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

   
}