package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.Student;
import com.bezkoder.springjwt.models.StudentCompany;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.CompanyRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.StudentCompanyRepository;
import com.bezkoder.springjwt.repository.StudentRepository;
import com.bezkoder.springjwt.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.Join;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.bezkoder.springjwt.dto.CompanyData;
import com.bezkoder.springjwt.dto.StudentCompanyData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import com.bezkoder.springjwt.models.User;

@Service("companyService")
public class DefaultCompanyService implements CompanyService{

	@Autowired(required = false)
    private CompanyRepository companyRepository;
	
	@Autowired(required = false)
    private StudentRepository studentRepository;
	
	@Autowired(required = false)
    private StudentCompanyRepository studentCompanyRepository;

	@Autowired(required = false)
	UserRepository userRepository;

	@Autowired(required = false)
	RoleRepository roleRepository;
    
	@Autowired
	PasswordEncoder encoder;
	 
	@Override
	public CompanyData saveCompany(CompanyData company) {
		Company companyModel = populateCompanyEntity(company);
		
		User user = new User(companyModel.getName(), 
				companyModel.getEmail(),
	               encoder.encode(companyModel.getPassword()));
	    Set<Role> roles = new HashSet<>();

	    Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
	              .orElseThrow(() -> new RuntimeException("Error: Mod Role is not found."));
	    roles.add(modRole);       
	    user.setRoles(roles);
	    userRepository.save(user);
	    companyModel.setUserId(user.getId());
        return populateCompanyData(companyRepository.save(companyModel));
	}
	@Override
	public CompanyData applyForCompany(Long companyId, Long studId) {
		Company company = companyRepository.findById(companyId).orElseThrow(() -> new EntityNotFoundException("Company not found"));
		System.out.println("studId: "+studId);
		Student student = studentRepository.findByUserId(studId);
		if(student == null) {
			new EntityNotFoundException("Student not found");
		}
		
		if(company != null) {
			company.setAppliedStudCount(company.getAppliedStudCount()==null?1:company.getAppliedStudCount()+1);
        } 
		StudentCompany studentCompanyModel = new StudentCompany();
		studentCompanyModel.setSelected(false);
		studentCompanyModel.setStudentId(studId);
		studentCompanyModel.setCompanyId(companyId);
		studentCompanyModel.setMarks(student.getMarks());
		studentCompanyModel.setStudentName(student.getUserName());
		studentCompanyModel.setEmail(student.getEmail());

		studentCompanyModel.setCompanyName(company.getName());
		studentCompanyModel.setStatus("Applied");
		studentCompanyRepository.save(studentCompanyModel);
        return populateCompanyData(companyRepository.save(company));
	}
	

    @Override
    public boolean deleteCompany(Long companyId) {
    	companyRepository.deleteById(companyId);
        return true;
    }



    @Override
    public List<StudentCompany> getAllAppliedCompanies(Long studId) {
    	List<StudentCompany> companyList = companyRepository.findByStudentIdCompanies(studId);
    	return companyList;
    }
    
    @Override
    public List<StudentCompany> getAllStudentsEnrolled(Long compId) {
    	List<StudentCompany> studList = companyRepository.findByStudentCompanyID(compId);
    	return studList;
    }
    
    
    @Override
    public List<CompanyData> getAllAvailableCompanies(Long studId) {
    	List<Company> companyList = companyRepository.findByMStudentId(studId);
    	
    	List<CompanyData> companies = new ArrayList<>();
    	companyList.forEach(company -> {
        	companies.add(populateCompanyData(company));
        });
		return companies;
    }
    
    @Override
    public List<CompanyData> getAllCompanies() {
        List<CompanyData> companies = new ArrayList<>();
        List<Company> companyList = companyRepository.findAll();
        companyList.forEach(company -> {
        	companies.add(populateCompanyData(company));
        });
        return companies;
    }

    @Override
    public CompanyData getCompanyById(Long companyId) {
        return populateCompanyData(companyRepository.findById(companyId).orElseThrow(() -> new EntityNotFoundException("Company not found")));
    }


    private CompanyData populateCompanyData(final Company company){
    	CompanyData companyData = new CompanyData();
    	companyData.setId(company.getId());
    	companyData.setName(company.getName());
    	companyData.setPassword(company.getPassword());
    	companyData.setCriteria(company.getCriteria());
    	companyData.setRole(company.getRole());
    	companyData.setEmail(company.getEmail());
    	companyData.setPlacedStudCount(company.getPlacedStudCount());
    	companyData.setAppliedStudCount(company.getAppliedStudCount());
        return companyData;
    }


    private Company populateCompanyEntity(CompanyData companyData){
        Company company = new Company();
        company.setName(companyData.getName());
        company.setPassword(companyData.getPassword());
        company.setRole(companyData.getRole());
        company.setEmail(companyData.getEmail());
        company.setCriteria(companyData.getCriteria());
        company.setPlacedStudCount(companyData.getPlacedStudCount());
        company.setAppliedStudCount(companyData.getAppliedStudCount());
        return company;
    }

}