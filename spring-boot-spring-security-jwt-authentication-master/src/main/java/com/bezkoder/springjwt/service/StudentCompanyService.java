package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.dto.StudentCompanyData;

import java.util.List;

public interface StudentCompanyService {

	StudentCompanyData saveStudentCompany(StudentCompanyData company);
    boolean deleteStudentCompany(final Long companyId);
    List<StudentCompanyData> getAllStudentCompanies();
    StudentCompanyData getStudentCompanyById(final Long companyId,final Long StudId);
}
