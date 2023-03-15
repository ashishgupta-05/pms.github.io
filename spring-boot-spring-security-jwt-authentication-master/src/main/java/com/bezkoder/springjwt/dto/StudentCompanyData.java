package com.bezkoder.springjwt.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class StudentCompanyData {

	private Long id;
	
	private Long studentId;
	private Long companyId;
	private Boolean selected;
	private String status;
	private String companyName;
	private String email;
	private String studentName;
	private String roleApplied;
	
	private Long ctc;
    
	
    
	public StudentCompanyData(String studentName, String status) {
		this.status = status;
		this.studentName = studentName;
	}

	public StudentCompanyData() {
    }

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}

	public Long getCtc() {
		return ctc;
	}

	public void setCtc(Long ctc) {
		this.ctc = ctc;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getRoleApplied() {
		return roleApplied;
	}

	public void setRoleApplied(String roleApplied) {
		this.roleApplied = roleApplied;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
	
   
}