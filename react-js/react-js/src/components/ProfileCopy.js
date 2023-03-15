import "../Home.css"
import { Navigate,Routes,Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import {  Link,Outlet } from "react-router-dom";

import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import PersonalInfo from "../components/PersonalInfo";
import 'material-symbols';


const ProfileCopy = () => {
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
   <div className="Wrapper">
            <div className="row">

                <div className="col-3 sidebar" >
                    <nav className="nav flex-column mt-5 ms-3">
                        
                    <Link className="nav-link sidebar-menu" to="/Personaldetails">
                            <span class="material-symbols-rounded me-3">
                                edit_note
                            </span>
                            <span className="align-top">Personal Details</span>
                        </Link>

                        <Link className="nav-link sidebar-menu" to="/Academicdetails">
                            <span class="material-symbols-outlined me-3">
                                account_balance
                            </span>
                            <span className="align-top">Academic Details</span>
                        </Link>

                        <Link className="nav-link sidebar-menu" to="/ProjectDetails">
                            <span className="material-symbols-outlined me-3">
                            list_alt
                            </span>
                            <span className="align-top">Project Details</span>
                        </Link>
                        <Link className="nav-link sidebar-menu" to="/ExtraActivities">
                            <span class="material-symbols-outlined me-3">
                                bookmark_manager
                            </span>
                            <span className="align-top">Extra Curricular Activities</span>
                        </Link>
             

                    </nav>
                </div>
               
                    <Outlet />

                </div>
                <div className="container mt-3">
 </div>

            
        </div>


    )
};

export default ProfileCopy;
