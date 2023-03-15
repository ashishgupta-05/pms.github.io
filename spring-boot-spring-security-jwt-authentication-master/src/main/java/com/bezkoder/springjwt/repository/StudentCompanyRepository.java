package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.Student;
import com.bezkoder.springjwt.models.StudentCompany;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentCompanyRepository extends JpaRepository<StudentCompany,Long> {

	@Query("SELECT s FROM StudentCompany s WHERE s.studentId= :studId And s.companyId= :compId")
	StudentCompany findByStudentId(Long studId, Long compId);
	
	//@Query("SELECT * FROM testdb.company c WHERE NOT EXISTS (SELECT * FROM testdb.student_company s WHERE c.id = s.company_id And s.student_id= :student_id")
	//public List<Company> findAvailableCompaniesByStudentId(@Param("student_id") Long studentId);
}