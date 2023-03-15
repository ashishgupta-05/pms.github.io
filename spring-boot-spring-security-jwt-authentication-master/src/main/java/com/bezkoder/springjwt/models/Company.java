package com.bezkoder.springjwt.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Company {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String password;
    private Integer criteria;
    private String role;
    private Integer placedStudCount;
    private Integer appliedStudCount;

    @CreationTimestamp
    @Column(name = "created_time", nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time",nullable = false)
    private LocalDateTime updatedTime;

    public Company() {
    }

    public Company(String name, String password, Integer criteria, String role,Integer placedStudCount) {
		super();
		this.name = name;
		this.password = password;
		this.criteria = criteria;
		this.placedStudCount = placedStudCount;
		this.setRole(role);
	}
  
    public Long getId() {
        return id;
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

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

	@Override
	public String toString() {
		return "Company [name=" + name + ", password=" + password + ", criteria=" + criteria + "]";
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
