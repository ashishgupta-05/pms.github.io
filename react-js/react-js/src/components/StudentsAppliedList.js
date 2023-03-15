import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import Table from 'react-bootstrap/Table';
import {  Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const StudentsAppliedList = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);

  const [selectStatus, setSelectStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState(false);


  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:8080/api/companies/getEnrolledStudents/"+currentUser.id, { headers: authHeader() });
    console.log("http://localhost:8080/api/companies/getEnrolledStudents/"+currentUser.id)
    const students = data;
    setStudents(students);
    console.log(students);
  };

  const updateStudentStatus = (studId, compId, status) => { 
    console.log(studId);
    //axios.post("http://localhost:8080/api/students/updateStudentStatus/"+studId+"/"+compId+"/"+status, { headers: authHeader() });
    return axios.post("http://localhost:8080/api/students/updateStudentStatus/"+studId+"/"+compId+"/"+status,{}, { headers: authHeader() })
    .then(response => {
      window.location.reload();
    }).catch(error => {
        console.log("updateStudentStatus error for blog ", error)
    })
  }
  useEffect(() => {
    
    fetchStudents();
  }, []);


  return (
    <div className="container">

 <div>
    
<div>
<Table striped bordered hover cellPadding="15" cellSpacing="10">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
 
            <tbody>
                {students.map(user =>
                    <tr key={user.studentId}>
                        <td>{user.studentName}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>
                        <a className="delete-icon" onClick={(e) => updateStudentStatus(user.studentId,user.companyId, "Interview Scheduled")}>
                              Schedule Interview
                          </a> <br></br> 
                          <a className="delete-icon" onClick={(e) => updateStudentStatus(user.studentId,user.companyId ,"Selected")}>
                            Select 
                          </a> <br></br> 
                          <a className="delete-icon" onClick={(e) => updateStudentStatus(user.studentId,user.companyId, "Rejected")}>
                              Reject
                          </a>
                        
 
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
</div></div>
</div>
  );
};

export default StudentsAppliedList;