package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.dto.CompanyData;
import com.bezkoder.springjwt.dto.StudentCompanyData;
import com.bezkoder.springjwt.models.StudentCompany;
import com.bezkoder.springjwt.service.CompanyService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/companies")
public class CompanyController {

    @Resource(name = "companyService")
    private CompanyService companyService;

    /**
     * <p>Get all Company data in the system.For production system you many want to use
     * pagination.</p>
     * @return List<CustomerData>
     */
    @GetMapping
    public List<CompanyData> getCompanies(){
        return companyService.getAllCompanies();
    }
    
    @GetMapping("/appliedCompanies/{studId}")
    public List<StudentCompany> getAppliedCompanies(@PathVariable Long studId){
    	System.out.println("studId: "+studId);
        return companyService.getAllAppliedCompanies(studId);
    }

    @GetMapping("/availableCompanies/{studId}")
    public List<CompanyData> getCompaniesToApply(@PathVariable Long studId){
    	System.out.println("studId: "+studId);
        return companyService.getAllAvailableCompanies(studId);
    }
    
    @GetMapping("/getEnrolledStudents/{compId}")
    public List<StudentCompany> getEnrolledStudents(@PathVariable Long compId){
    	System.out.println("compId: "+compId);
        return companyService.getAllStudentsEnrolled(compId);
    }

    /**
     * Method to get the customer data based on the ID.
     * @param id
     * @return CustomerData
     */
    @GetMapping("/company/{id}")
    public CompanyData getCompany(@PathVariable Long id){
        return companyService.getCompanyById(id);
    }

    /**
     * Post request to create customer information int the system.
     * @param customerData
     * @return
     */
    @PostMapping("/company")
    @PreAuthorize("hasRole('ADMIN')")
    public CompanyData saveCompany(final @RequestBody CompanyData companyData){
        return companyService.saveCompany(companyData);
    }
    
    @PostMapping("/applycompany/{compId}/{studId}")
    public CompanyData applyForCompany(@PathVariable Long compId, @PathVariable Long studId){
    	System.out.println("CHeck for studId "+studId);
        return companyService.applyForCompany(compId,studId);
    }

    /**
     * Delete customer from the system based on the ID. The method mapping is similar to the getCustomer with difference of
     * @DeleteMapping and @GetMapping
     * @param id
     * @return
     */
    @DeleteMapping("/company/{id}")
    public Boolean deleteCustomer(@PathVariable Long id){
        return companyService.deleteCompany(id);
    }

}