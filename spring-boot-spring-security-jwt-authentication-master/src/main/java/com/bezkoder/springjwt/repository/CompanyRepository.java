package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.dto.StudentCompanyData;
import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.StudentCompany;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<Company,Long> {

	List<Company> findAll(Specification<Company> specification);

	@Query("SELECT c FROM Company c WHERE c.id NOT IN (SELECT s.companyId FROM StudentCompany s WHERE s.studentId= :studentId)")
	List<Company> findByMStudentId(@Param(value = "studentId") Long studentId);
	
	@Query("SELECT s FROM StudentCompany s WHERE s.studentId= :studentId")
	List<StudentCompany> findByStudentIdCompanies(@Param(value = "studentId") Long studentId);

	@Query("SELECT s FROM StudentCompany s WHERE s.companyId= :companyId")
	List<StudentCompany> findByCompanyID(Long companyId);
	
	//@Query("SELECT * FROM testdb.student_company sc Join testdb.student s ON sc.student_id = s.id where sc.company_id= :companyId")
	@Query("SELECT sc FROM StudentCompany sc Join Student s ON sc.studentId = s.userId where sc.companyId IN (select c.id from Company c where c.userId=:companyId)")
	List<StudentCompany> findByStudentCompanyID(Long companyId);
	
}