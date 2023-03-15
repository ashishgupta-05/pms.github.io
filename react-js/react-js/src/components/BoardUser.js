import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from "axios";
import authHeader from "../services/auth-header";
import Table from 'react-bootstrap/Table';

const BoardUser = () => {
  /* const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []); */

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:8080/api/students/", { headers: authHeader() });
    const students = data;
    setStudents(students);
    console.log(students);
  };

  return (
    <div className="container">
<Table striped bordered hover cellPadding="15" cellSpacing="10">
            <thead>
                <tr>
                <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
            </thead>
 
            <tbody>
                {students.map(user =>
                    <tr key={user.id}>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                    </tr>
                )}
            </tbody>
        </Table>
  </div>
  );
};

export default BoardUser;
