package com.bezkoder.springjwt.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.dto.CompanyData;
import com.bezkoder.springjwt.dto.StudentData;
import com.bezkoder.springjwt.models.Company;
import com.bezkoder.springjwt.models.Student;
import com.bezkoder.springjwt.models.StudentCompany;
import com.bezkoder.springjwt.repository.StudentCompanyRepository;
import com.bezkoder.springjwt.repository.StudentRepository;



@Service("studentService")
public class DefaultStudentService implements StudentService{

	
	@Autowired(required = false)
	private StudentRepository studentRepository;
	
	@Autowired(required = false)
    private StudentCompanyRepository studentCompanyRepository;
	
	@Override
	public StudentData saveStudent(StudentData student) {
		// TODO Auto-generated method stub
		Student studentModel=populateStudentEntity(student);
		return  populateStudentData(studentRepository.save(studentModel));
	}


	@Override
	public boolean deleteStudent(Long studentId) {
		studentRepository.deleteById(studentId);
		return false;
	}

	@Override
	public List<StudentData> getAllStudents() {
		 List<StudentData> students = new ArrayList<>();
	        List<Student> studentList = studentRepository.findAll();
	        studentList.forEach(company -> {
	        	students.add(populateStudentData(company));
	        });
	        return students;
	}

	@Override
	public StudentData getStudentById(Long studentId) {
	
		 return populateStudentData(studentRepository.findById(studentId).orElseThrow(() -> new EntityNotFoundException("Company not found")));
	}

	
	private  StudentData populateStudentData(final Student student) {
		StudentData studentData= new StudentData();
		studentData.setId(student.getId());
		studentData.setFname(student.getFname());
		studentData.setEmail(student.getEmail());
		studentData.setLname(student.getLname());
		studentData.setPassword(student.getPassword());
		studentData.setUserName(student.getUserName());
		studentData.setAction(student.getAction());
		studentData.setMarks(student.getMarks());
		studentData.setSscMarks(student.getSscMarks());
		studentData.setHscMarks(student.getHscMarks());
		studentData.setCity(student.getCity());
		studentData.setAddress(student.getAddress());
		studentData.setContact(student.getContact());
		studentData.setBirthdate(student.getBirthdate());
		studentData.setState(student.getState());
		
		studentData.setGraduation(student.getGraduation());
		studentData.setUniversity(student.getUniversity());
		studentData.setGradPercentage(student.getGradPercentage());
		studentData.setProjTitle(student.getProjTitle());
		studentData.setFrontLang(student.getFrontLang());
		studentData.setProjeDetails(student.getProjeDetails());
		
		studentData.setCareerObj(student.getCareerObj());
		studentData.setAcademicAchievments(student.getAcademicAchievments());
		studentData.setCertifications(student.getCertifications());
		studentData.setInternship(student.getInternship());
		return studentData;
		
		
		
	}
	private Student populateStudentEntity(StudentData studentData) {
	
		Student student = new Student();
		student.setFname(studentData.getFname());
		student.setLname(studentData.getLname());
		student.setEmail(studentData.getEmail());
		student.setPassword(studentData.getPassword());
		student.setAction(studentData.getAction());
		student.setUserName(studentData.getUserName());
		student.setUserId(studentData.getUserId());
		student.setMarks(studentData.getMarks());
		
		student.setGraduation(studentData.getGraduation());
		student.setUniversity(studentData.getUniversity());
		student.setGradPercentage(studentData.getGradPercentage());
		student.setProjTitle(studentData.getProjTitle());
		student.setFrontLang(studentData.getFrontLang());
		student.setProjeDetails(studentData.getProjeDetails());
		
		student.setCareerObj(studentData.getCareerObj());
		student.setAcademicAchievments(studentData.getAcademicAchievments());
		student.setCertifications(studentData.getCertifications());
		student.setInternship(studentData.getInternship());
		
		return student;
	}


	@Override
	public StudentCompany updateStudentStatus(Long studId, Long compId, String status) {
		StudentCompany studentCompanyModel = studentCompanyRepository.findByStudentId(studId,compId);
		if(studentCompanyModel == null) {
				new EntityNotFoundException("Student not found");
		}
		//studentCompanyModel.setSelected(true);
		studentCompanyModel.setStatus(status);
		studentCompanyRepository.save(studentCompanyModel);
		return studentCompanyModel;
	}


	@Override
	public StudentData getStudentByUserId(Long userId) {
		Student studentModel = studentRepository.findByUserId(userId);
		if(studentModel == null) {
				new EntityNotFoundException("Student not found");
		}
		return populateStudentData(studentModel);
	}


	@Override
	public StudentData updateStudent(StudentData studentData) {
		Student studentModel = studentRepository.findById(studentData.getId()).orElseThrow(() -> new EntityNotFoundException("Company not found"));
		studentModel.setEmail(studentData.getEmail());
		studentModel.setFname(studentData.getFname());
		studentModel.setLname(studentData.getLname());
		studentModel.setMarks(studentData.getMarks());
		studentModel.setHscMarks(studentData.getHscMarks());
		studentModel.setSscMarks(studentData.getSscMarks());
		studentModel.setCity(studentData.getCity());
		studentModel.setAddress(studentData.getAddress());
		studentModel.setContact(studentData.getContact());
		studentModel.setBirthdate(studentData.getBirthdate());
		studentModel.setState(studentData.getState());
		
		studentModel.setGraduation(studentData.getGraduation());
		studentModel.setUniversity(studentData.getUniversity());
		studentModel.setGradPercentage(studentData.getGradPercentage());
		studentModel.setProjTitle(studentData.getProjTitle());
		studentModel.setFrontLang(studentData.getFrontLang());
		studentModel.setBackLang(studentData.getBackLang());
		studentModel.setProjeDetails(studentData.getProjeDetails());
		
		studentModel.setCareerObj(studentData.getCareerObj());
		studentModel.setAcademicAchievments(studentData.getAcademicAchievments());
		studentModel.setCertifications(studentData.getCertifications());
		studentModel.setInternship(studentData.getInternship());

		studentRepository.save(studentModel);
		return null;
	}

	
}