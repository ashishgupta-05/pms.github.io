package com.bezkoder.springjwt.service;

import java.util.List;

import com.bezkoder.springjwt.dto.StudentData;
import com.bezkoder.springjwt.models.StudentCompany;

public interface StudentService {
      
	StudentData saveStudent(StudentData student);
	boolean deleteStudent(final Long studentId);
	List<StudentData> getAllStudents();
   StudentData getStudentById(final Long studentId);
   StudentCompany updateStudentStatus(Long studId, Long compId, String status);
StudentData getStudentByUserId(Long userId);
StudentData updateStudent(StudentData studentData);
		
}