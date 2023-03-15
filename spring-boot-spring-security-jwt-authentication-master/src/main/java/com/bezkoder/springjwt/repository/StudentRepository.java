package com.bezkoder.springjwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.Student;

public interface StudentRepository extends JpaRepository <Student,Long> {

	@Query("SELECT s FROM Student s WHERE s.userId= :studId")
	Student findByUserId(Long studId);

}