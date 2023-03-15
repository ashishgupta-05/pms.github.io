import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import Table from 'react-bootstrap/Table';
import {  Link } from "react-router-dom";


const ApplyJob = () => {


  const [companies, setCompanies] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const fetchCompaniess = async () => {
    const { data } = await axios.get("http://localhost:8080/api/companies/availableCompanies/"+currentUser.id, { headers: authHeader() });
    const companies = data;
    setCompanies(companies);
    console.log(companies);
  };

const applyForCompany = (id) => { 
    console.log("Apply for: "+id+" studId: "+currentUser.id);
   // axios.post("http://localhost:8080/api/companies/applycompany/"+id, { headers: authHeader() });

   return axios.post("http://localhost:8080/api/companies/applycompany/"+id+"/"+currentUser.id, {},{
    headers: authHeader()
  }) .then(res => {
        if (res.status === 200) {
            //return <Redirect to='/'/>;
            window.location.replace("/jobs");
            //this.setState({ redirect: true }); // after signing up, set the state to true. This will trigger a re-render
        }
    });

}
  useEffect(() => {
    fetchCompaniess();
  }, []);


  return (
    <div className="container">  
<div>
<Table striped bordered hover cellPadding="15" cellSpacing="10">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
 
            <tbody>
                {companies.map(company =>
                    <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.role}</td>
                        <td>
                    
                        <a href="#" onClick={(e) => applyForCompany(company.id)}>Apply For Job</a>

                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
</div></div>

  );
};

export default ApplyJob;
