import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/companies/";

const addCompany = (companyname, password, role, email,criteria) => {
 

    const compObj = {"name":companyname,"password":password,"role":role, "email":email,
    "criteria":criteria,"placedStudCount":0 };
  return axios.post(API_URL + "company", compObj,{
    headers: authHeader()
  }) .then(res => {
        if (res.status === 200) {
            //return <Redirect to='/'/>;
            window.location.replace("/admin");
            //this.setState({ redirect: true }); // after signing up, set the state to true. This will trigger a re-render
        }
    });

   
};


export default {
  addCompany
};
