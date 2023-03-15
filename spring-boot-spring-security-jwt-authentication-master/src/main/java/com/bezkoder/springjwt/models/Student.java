
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
public class Student {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
    private String userName;
	private String fname;
	private String lname;
	private String email;
	private String password;
	private String action;
	private int marks;  //Graduate CGPA
	private int hscMarks;
	private int sscMarks;
	private Long userId;
	private String contact;
	private String birthdate;
	private String city;
	private String state;
	private String address;
	
	private String graduation;
	private String university;
	private int gradPercentage;
	private String projTitle;
	private String frontLang;
	private String backLang;
	private String projeDetails;
	
	private String careerObj;
	private String academicAchievments;
	private String certifications;
	private String internship;

	public String getGraduation() {
		return graduation;
	}


	public void setGraduation(String graduation) {
		this.graduation = graduation;
	}


	public String getUniversity() {
		return university;
	}


	public void setUniversity(String university) {
		this.university = university;
	}


	public int getGradPercentage() {
		return gradPercentage;
	}


	public void setGradPercentage(int gradPercentage) {
		this.gradPercentage = gradPercentage;
	}


	public String getProjTitle() {
		return projTitle;
	}


	public void setProjTitle(String projTitle) {
		this.projTitle = projTitle;
	}


	public String getFrontLang() {
		return frontLang;
	}


	public void setFrontLang(String frontLang) {
		this.frontLang = frontLang;
	}


	public String getBackLang() {
		return backLang;
	}


	public void setBackLang(String backLang) {
		this.backLang = backLang;
	}


	public String getProjeDetails() {
		return projeDetails;
	}


	public void setProjeDetails(String projeDetails) {
		this.projeDetails = projeDetails;
	}


	public String getCareerObj() {
		return careerObj;
	}


	public void setCareerObj(String careerObj) {
		this.careerObj = careerObj;
	}


	public String getAcademicAchievments() {
		return academicAchievments;
	}


	public void setAcademicAchievments(String academicAchievments) {
		this.academicAchievments = academicAchievments;
	}


	public String getCertifications() {
		return certifications;
	}


	public void setCertifications(String certifications) {
		this.certifications = certifications;
	}


	public String getInternship() {
		return internship;
	}


	public void setInternship(String internships) {
		this.internship = internships;
	}


	

	
	 public String getContact() {
		return contact;
	}


	public void setContact(String contact) {
		this.contact = contact;
	}


	public String getBirthdate() {
		return birthdate;
	}


	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	@CreationTimestamp
	 @Column(name = "created_time", nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
	    private LocalDateTime createdTime;

	    @UpdateTimestamp
	    @Column(name = "updated_time",nullable = false)
	    private LocalDateTime updatedTime;
	    

		public Student(Long id, String fname, String lname, String email, String password, String action, Long userId) {
			super();
			this.userId = userId;
			this.fname = fname;
			this.lname = lname;
			this.email = email;
			this.password = password;
			this.action = action;
		}
		

		public Student() {
			// TODO Auto-generated constructor stub
		}




		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getFname() {
			return fname;
		}

		public void setFname(String fname) {
			this.fname = fname;
		}

		public String getLname() {
			return lname;
		}

		public void setLname(String lname) {
			this.lname = lname;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getAction() {
			return action;
		}

		public void setAction(String action) {
			this.action = action;
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


		public String getUserName() {
			return userName;
		}


		public void setUserName(String userName) {
			this.userName = userName;
		}


		public Long getUserId() {
			return userId;
		}


		public void setUserId(Long userId) {
			this.userId = userId;
		}


		public int getMarks() {
			return marks;
		}


		public void setMarks(int marks) {
			this.marks = marks;
		}


		public int getHscMarks() {
			return hscMarks;
		}


		public void setHscMarks(int hscMarks) {
			this.hscMarks = hscMarks;
		}


		public int getSscMarks() {
			return sscMarks;
		}


		public void setSscMarks(int sscMarks) {
			this.sscMarks = sscMarks;
		}
	    
	    

}
