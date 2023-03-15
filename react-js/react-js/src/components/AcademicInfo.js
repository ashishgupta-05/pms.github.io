import React, { useState, useEffect } from "react";
import "../CSS/Personainfo.css"
import axios from "axios";
import authHeader from "../services/auth-header";
import { useSelector } from "react-redux";

export default function AcademicInfo()  {

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
              <h4 className="mt-2 ">Academic Details</h4>
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
                          <h6>SSC Percentage <span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.sscMarks}
                              placeholder=""
                              className="form-control form-control-sm mb-3 inputform "
                              required=""
                              onChange={(event) => student.sscMarks=event.target.value}>
                          </input>
                      </td>
                      <td>
                          <h6>HSC Percentage  <span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.hscMarks}
                              placeholder=""
                              className="form-control form-control-sm mb-3 inputform "
                              required=""
                              onChange={(event) => student.hscMarks=event.target.value}>
                          </input>
                      </td>
                     
                  </tr>

                  <tr>
                      <td>
                          <h6>Graduation <span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.graduation}
                              placeholder=" "
                              className="form-control form-control-sm mb-3 inputform "
                              required=""
                              onChange={(event) => student.graduation=event.target.value}>
                          </input>
                      </td>
                      <td>
                          <h6>Graduation University <span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.university}
                              className="form-control form-control-sm mb-3 inputform"
                              placeholder=""
                              required=""
                              onChange={(event) => student.university=event.target.value}>
                          </input>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <h6>Graduation Percentage<span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.gradPercentage}
                              className="form-control form-control-sm mb-3 inputform"
                              placeholder=""
                              required=""
                              onChange={(event) => student.gradPercentage=event.target.value}>
                          </input>
                      </td>
                      <td>
                          <h6>Graduation CPGA<span className="text-danger"> *</span></h6>
                          <input type="text"
                              defaultValue={student.marks}
                              className="form-control form-control-sm mb-3 inputform"
                              placeholder=""
                              required=""
                              onChange={(event) => student.marks=event.target.value}>
                          </input>
                      </td>
                  </tr>
                 
              </table>
          </div>

      </div>



  )
}