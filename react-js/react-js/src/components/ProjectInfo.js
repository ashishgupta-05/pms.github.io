import React, { useState, useEffect } from "react";
import "../CSS/Personainfo.css"
import axios from "axios";
import authHeader from "../services/auth-header";
import { useSelector } from "react-redux";
import "../CSS/ProjDetails.css"

export default function ProjectInfo()  {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [student, setStudent] = useState([]);

const fetchStudent = async (id) => {
  const { data } = await axios.get("http://localhost:8080/api/students/studentinfo/"+id, { headers: authHeader() });
  setStudent(data);
  console.log("Student ID:"+id);
  console.log(data);
};

const saveStudent = (student) => { 
  console.log("Update student: "+student.id);
  axios.post("http://localhost:8080/api/students/updatestudent/",student, { headers: authHeader() })
  .then(response => {
      console.log(student);
      window.location.href='/userprofile';
    }).catch(error => {
        console.log("saveStudent error ", error)
    })

}
useEffect(() => {
  fetchStudent(currentUser.id);
}, []);


  return (
      <div className="mt-4">
          <div className="text-center" style={{ height: "8vh", backgroundColor: "cadetblue", padding: 5, color: "white" }}>
              <h4 className="mt-2 ">Project Details</h4>
          </div>
<br></br>
<div className="text-center">
                  <button style={{float: "right",  width: "100px"}} className="btn btn-dark " 
                  onClick={() => saveStudent(student)}>Update</button>
                  {/*</div></div>onClick={event =>  window.location.href='/profile'}>Save</button> */}
              </div>
          <div className="container-fluid justify-content-center">
              
              <table>
                  <tr>
                  <td>
                          <h6>Project Title <span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.projTitle}
                              placeholder=""
                              className="form-control form-control-sm mb-3 inputform "
                              required=""
                              onChange={(event) => student.projTitle=event.target.value}>
                          </input>
                      </td>
                      <td>
                          <h6>Frontend Language Used  <span className="text-danger"> *</span></h6>
                          <select className="form-select mb-3" defaultValue={student.frontLang}
                           onChange={(event) => student.frontLang=event.target.value} >
                                <option value="angular">Angular</option>
                                <option value="html">Html/CSS</option>
                                <option value="reactjs">React Js</option>
                                <option value="reactnative">React Native</option>
                            </select>
                      </td>
                     
                  </tr>
                    <tr><td><h6>Backend Language Used  <span className="text-danger"> *</span></h6>
                          <select className="form-select mb-3" defaultValue={student.backLang} onChange={(event) => student.backLang=event.target.value} >
                                <option value="C">C</option>
                                <option value="Cpp">C++</option>
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                                <option value=".net">.net</option>
                            </select></td><td></td></tr>
                  <tr>
                      <td colspan="2">
                          <h6>Project Abstract <span className="text-danger"> *</span></h6>
                    <textarea className="inputform form-control" id="floatingTextarea" 
                    style={{width: "92%", height:"100px" }} 
                    defaultValue={student.projeDetails}
                    onChange={(event) => student.projeDetails =event.target.value}></textarea>
                      </td>
                     
                  </tr>
                 
              </table>
          </div>

      </div>



  )
}