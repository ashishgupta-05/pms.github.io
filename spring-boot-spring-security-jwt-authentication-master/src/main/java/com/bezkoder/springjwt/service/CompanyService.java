package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.dto.CompanyData;
import com.bezkoder.springjwt.dto.StudentCompanyData;
import com.bezkoder.springjwt.models.StudentCompany;

import java.util.List;

public interface CompanyService {

	CompanyData saveCompany(CompanyData company);
    boolean deleteCompany(final Long companyId);
    List<CompanyData> getAllCompanies();
    CompanyData getCompanyById(final Long companyId);
	CompanyData applyForCompany(final Long companyId,final Long studId);
	List<CompanyData> getAllAvailableCompanies(Long studId);
	List<StudentCompany> getAllAppliedCompanies(Long studId);
	List<StudentCompany> getAllStudentsEnrolled(Long compId);
}
