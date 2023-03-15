package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.dto.CompanyData;
import com.bezkoder.springjwt.dto.StudentData;
import com.bezkoder.springjwt.models.StudentCompany;
import com.bezkoder.springjwt.service.CompanyService;
import com.bezkoder.springjwt.service.StudentService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/students")
public class StudentController {
	 @Resource(name = "studentService")
	    private StudentService studentService;

	    /**
	     * <p>Get all Company data in the system.For production system you many want to use
	     * pagination.</p>
	     * @return List<CustomerData>
	     */
	    @GetMapping
	    @PreAuthorize("hasRole('ADMIN')")
	    public List<StudentData> getStudents(){
	        return studentService.getAllStudents();
	    }
	    
	    @PostMapping("/updatestudent")
	    public StudentData updateStudent(final @RequestBody StudentData studentData){
	    	System.out.println("Update student: "+studentData.getId());
	        return studentService.updateStudent(studentData);
	    }

	    /**
	     * Method to get the customer data based on the ID.
	     * @param id
	     * @return CustomerData
	     */
	    @GetMapping("/student/{id}")
	    public StudentData getStudent(@PathVariable Long id){
	        return studentService.getStudentById(id);
	    }
	    
	    @GetMapping("/studentinfo/{userId}")
	    public StudentData getStudentInfo(@PathVariable Long userId){
	        return studentService.getStudentByUserId(userId);
	    }

	    /**
	     * Post request to create customer information int the system.
	     * @param customerData
	     * @return
	     */
	    @PostMapping("/student")

	    public StudentData saveStudent(final @RequestBody StudentData studentData){
	        return studentService.saveStudent(studentData);
	    }

	    /**
	     * Delete customer from the system based on the ID. The method mapping is similar to the getCustomer with difference of
	     * @DeleteMapping and @GetMapping
	     * @param id
	     * @return
	     */
	    @DeleteMapping("/student/{id}")
	    public Boolean deletetudent(@PathVariable Long id){
	        return studentService.deleteStudent(id);
	    }

	    
	    @PostMapping("/updateStudentStatus/{studId}/{compId}/{status}")
	    public StudentCompany updateStudentStatus(@PathVariable Long studId, @PathVariable Long compId, @PathVariable String status){
	    	System.out.println("studId: "+studId+" compId: "+compId+" status: "+status);
	        return studentService.updateStudentStatus(studId, compId,status);
	    }
	}

