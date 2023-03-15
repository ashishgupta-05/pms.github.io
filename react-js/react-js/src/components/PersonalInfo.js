import React, { useState, useEffect } from "react";
import "../CSS/Personainfo.css"
import axios from "axios";
import authHeader from "../services/auth-header";
import { useSelector } from "react-redux";

const PersonalInfo = () => {

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
                <h4 className="mt-2 ">Personal Details</h4>
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
                            <h6>User Name<span className="text-danger"> *</span></h6>
                            <input type="text" disabled
                                value={student.userName}
                                placeholder=""
                                className="form-control form-control-sm mb-3 inputform "
                                required=""
                                >
                            </input>
                        </td>
                        <td>
                            <h6>First Name<span className="text-danger"> *</span></h6>
                            <input type="text"
                               
                                defaultValue={student.fname}
                                placeholder=""
                                className="form-control form-control-sm mb-3 inputform "
                                required=""
                                onChange={(event) => student.fname=event.target.value}>
                            </input>
                        </td>
                       
                    </tr>

                    <tr>
                        <td>
                            <h6>Last Name<span className="text-danger"> *</span></h6>
                            <input type="text"
                                defaultValue={student.lname}
                                placeholder=" "
                                className="form-control form-control-sm mb-3 inputform "
                                required=""
                                onChange={(event) => student.lname=event.target.value}>
                            </input>
                        </td>
                        <td>
                            <h6>Email<span className="text-danger"> *</span></h6>
                            <input type="email"
                                defaultValue={student.email}
                                className="form-control form-control-sm mb-3 inputform"
                                placeholder="Enter Model"
                                required=""
                                onChange={(event) => student.email=event.target.value}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h6>Contact<span className="text-danger"> *</span></h6>
                            <input type="text"
                                defaultValue={student.contact}
                                className="form-control form-control-sm mb-3 inputform"
                                placeholder=""
                                required=""
                                onChange={(event) => student.contact=event.target.value}>
                            </input>
                        </td>
                        <td>
                            <h6>Birth Date<span className="text-danger"> *</span></h6>
                            <input type="date"
                                defaultValue={student.birthdate}
                                className="form-control form-control-sm mb-3 inputform"
                                placeholder="Enter price"
                                required=""
                                onChange={(event) => student.birthdate=event.target.value}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <h6>City<span className="text-danger"> *</span></h6>
                            <input type="text"
                                defaultValue={student.city}
                                className="form-control form-control-sm mb-3 inputform"
                                placeholder=""
                                required=""
                                onChange={(event) => student.city=event.target.value}>
                            </input>
                            
                        </td>
                        <td>
                        <h6>State<span className="text-danger"> *</span> </h6>
                            <input type="text"
                                defaultValue={student.state}
                                placeholder=""
                                className="form-control form-control-sm mb-3 inputform "
                                required="value"
                                onChange={(event) => student.state=event.target.value}>
                            </input> 
                        </td>
                    </tr>
               <tr><td>
               <h6>Address<span className="text-danger" > *</span></h6>
                    <textarea className="inputform form-control" id="floatingTextarea" style={{ width: "350px",height:"100px"}} 
                    defaultValue={student.address}
                    onChange={(event) => student.address=event.target.value}></textarea>
                </td></tr>
                </table>
               
               

            </div>

        </div>



    )
}
export default PersonalInfo;