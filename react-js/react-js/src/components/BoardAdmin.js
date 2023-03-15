import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import Table from 'react-bootstrap/Table';
import {  Link } from "react-router-dom";


const BoardAdmin = () => {


  const [companies, setCompanies] = useState([]);

  const fetchCompaniess = async () => {
    const { data } = await axios.get("http://localhost:8080/api/companies/", { headers: authHeader() });
    const companies = data;
    setCompanies(companies);
    console.log(companies);
  };

  const deleteCompany = (id) => { 
    console.log(id);
    axios.delete("http://localhost:8080/api/companies/company/"+id, { headers: authHeader() });

    const newList = companies.filter((item) => item.id !== id);

    setCompanies(newList);
}
  useEffect(() => {
    fetchCompaniess();
  }, []);


  return (
    <div className="container">

 <div>
  <div style={{padding: '20px 0px'}}>
    
    <Link to={"/add_company"} className="nav-link">
    <button size="xs" className="btn btn-dark">
   <span>   Add Company</span></button>
            </Link>
    </div>
    
<div>
<Table striped bordered hover cellPadding="15" cellSpacing="10">
            <thead>
                <tr>
                    <th>Company Id</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
 
            <tbody>
                {companies.map(company =>
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.email}</td>
                        <td>{company.role}</td>
                        <td>
                          <span className="delete-icon" onClick={() => deleteCompany(company.id)}>
                          </span>
                        <button className="btn btn-dark btn-block" size="sx" onClick={ () => deleteCompany(company.id) }>Delete</button>
     
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
</div></div>
</div>
  );
};

export default BoardAdmin;
