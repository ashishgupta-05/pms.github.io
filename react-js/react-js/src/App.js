import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import AddCompany from "./components/AddCompany";
import ApplyJob from "./components/ApplyJob";
import AppliedJob from "./components/AppliedJob";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import StudentList from "./components/StudentList";
import StudentsAppliedList from "./components/StudentsAppliedList";

import ProfileCopy from "./components/ProfileCopy";
import PersonalInfo from "./components/PersonalInfo";
import AcademicInfo from "./components/AcademicInfo";
import ProjectInfo from "./components/ProjectInfo";
import ExtraInfo from "./components/ExtraInfo";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowUserBoard(currentUser.roles.includes("ROLE_USER") && !currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setShowUserBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand" style={{display:"inherit"}}>
        <img src="./logo.png"  height={50} />
        <h4>Placement Management System</h4>
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/jobs"} className="nav-link">
                Apply For Jobs
              </Link>
            </li>
          )}
          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/applied_jobs"} className="nav-link">
                My Jobs Applied
              </Link>
            </li>
          )}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/recruiter"} className="nav-link">
                Recruiter Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Companies
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">

{!showUserBoard && (
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                My Profile
              </Link>
            </li> )}
{showUserBoard && (
            <li className="nav-item">
              <Link to={"/userprofile"} className="nav-link">
                My Profile
              </Link>
            </li> )}

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<ProfileCopy />} />
          
          <Route path="/profile" element={<Profile />} />

          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/add_company" element={<AddCompany />} />
          <Route path="/jobs" element={<ApplyJob />} /> 
          <Route path="/students" element={<StudentList />} /> 
          <Route path="/applied_jobs" element={<AppliedJob />} /> 
          <Route path="/recruiter" element={<StudentsAppliedList />} /> 
          
          <Route path="/ExtraActivities" element={<ExtraInfo/>} />
          <Route path="/Personaldetails" element={<PersonalInfo/>} />
          <Route path="/Academicdetails" element={<AcademicInfo/>} />
          <Route path="/Projectdetails" element={<ProjectInfo/>} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
