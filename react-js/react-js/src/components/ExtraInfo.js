import React, { useState, useEffect } from "react";
import "../CSS/Personainfo.css"
import axios from "axios";
import authHeader from "../services/auth-header";
import { useSelector } from "react-redux";
import "../CSS/ProjDetails.css"

export default function ExtraInfo()  {

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
    <div className="continer-fluid" >
        <div className="text-center" style={{ height: "8vh", backgroundColor: "cadetblue", padding: 5, color: "white" }}>
              <h4 className="mt-2 ">Extra Curricular Activities</h4>
          </div>
<br></br>

    <div className="text-center">
                  <button style={{float: "right",  width: "100px"}} className="btn btn-dark " 
                  defaultValue={student.email}
                  onClick={() => saveStudent(student)}>Update</button>
              </div>
    <div className="form p-4">

        <div class="form-group shadow-textarea  ">
            <p className="fs-5 border-bottom ">Carrer Objective</p>
            <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" 
            defaultValue={student.careerObj}
            rows="3" placeholder="Write something here..." 
            onChange={(event) => student.careerObj=event.target.value}
            ></textarea>
        </div>
        <div class="form-group shadow-textarea  ">
            <p className="fs-5 border-bottom ">Academic Achievements</p>
            <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" 
            defaultValue={student.academicAchievments}
            rows="3" placeholder="Write something here..." 
            onChange={(event) => student.academicAchievments=event.target.value}>
            </textarea>
        </div>
        <div class="form-group shadow-textarea  ">
            <p className="fs-5 border-bottom ">Certifications</p>
            <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" 
            defaultValue={student.certifications} certifications
            rows="3" placeholder="Write something here..." 
            onChange={(event) => student.certifications=event.target.value}>
            </textarea>
        </div>
        <div class="form-group shadow-textarea  ">
            <p className="fs-5 border-bottom ">Internships(If any)</p>
            <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" 
            defaultValue={student.internship}
            rows="3" placeholder="Write something here..." 
            onChange={(event) => student.internship=event.target.value}
            ></textarea>
        </div>

    </div>





</div>



  )
}