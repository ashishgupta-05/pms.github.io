
import { Navigate,Routes,Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import {  Link } from "react-router-dom";

import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [student, setStudent] = useState([]);

  const fetchStudent = async (id) => {
    const { data } = await axios.get("http://localhost:8080/api/students/studentinfo/"+id, { headers: authHeader() });
    setStudent(data);
    console.log("Student ID:"+id);
    console.log(data);
  };
 
  
  useEffect(() => {
    fetchStudent(currentUser.id);
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }


  return (
    <div className="container">
        <h3>
          <strong>My Profile</strong>
        </h3>

      <Table striped bordered hover cellPadding="15" cellSpacing="5">
      <thead>
      <tr>
                <th width="30%">User ID</th><td>{currentUser.id}</td></tr>
                <tr><th>User Name</th><td>{currentUser.username}</td></tr>
                <tr><th>Email</th><td>{currentUser.email}</td></tr>
                {(currentUser.roles.indexOf("ROLE_USER") != -1 && (<tr><th>10th Marks</th><td>{student.sscMarks}% </td></tr>))}
                {(currentUser.roles.indexOf("ROLE_USER") != -1 && ( <tr><th>12th Marks</th> <td>{student.hscMarks}%</td></tr>))}
               
                {(currentUser.roles.indexOf("ROLE_USER") != -1 && ( 
            <tr><th>CGPA [Graduation]</th> <td>{student.marks}</td></tr>
            ))}
            </thead>

        </Table>
        <div style={{float:'right'}}>
    
    <Link to={"/edit_password"} className="nav-link">
    
   <span>   Change Password</span>
            </Link>
    </div>

    </div>


  );
};

export default Profile;
