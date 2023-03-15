import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import Table from 'react-bootstrap/Table';
import {  Link } from "react-router-dom";


const StudentList = () => {


  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:8080/api/students/", { headers: authHeader() });
    const students = data;
    setStudents(students);
    console.log(students);
  };

  const deleteStudent = (id) => { 
    console.log(id);
   // axios.delete("http://localhost:8080/api/companies/company/"+id, { headers: authHeader() });

  //  const newList = companies.filter((item) => item.id !== id);

  // setStudents(newList);
}
  useEffect(() => {
    fetchStudents();
  }, []);


  return (
    <div className="container">

 <div>
  <div style={{padding: '20px 0px'}}>
    
    <Link to={"/"} className="nav-link">
    <button size="xs" className="btn btn-dark">
   <span>   Add Student</span></button>
            </Link>
    </div>
    
<div>
<Table striped bordered hover cellPadding="15" cellSpacing="10">
            <thead>
                <tr>
                  <th>User Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
 
            <tbody>
                {students.map(user =>
                    <tr key={user.id}>
                      <td>{user.userName}</td>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="delete-icon" onClick={() => deleteStudent(user.id)}>
                          </span>
 
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
</div></div>
</div>
  );
};

export default StudentList;
