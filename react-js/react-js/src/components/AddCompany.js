import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { addCompany } from "../actions/company";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
const vcompanyname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The company name must be between 2 and 20 characters.
        </div>
      );
    }
  };
  const validRole = (value) => {
    if (value.length < 4 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The role name must be between 4 and 20 characters.
        </div>
      );
    }
  };
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
const AddCompany = (props) => {
    const form = useRef();
    const checkBtn = useRef();


    const [companyname, setCompanyname] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [criteria, setCriteria] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeCompanyname = (e) => {
        const companyname = e.target.value;
        setCompanyname(companyname);
      };
    
      const onChangeRole = (e) => {
        const role = e.target.value;
        setRole(role);
      };
      const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const onChangeCriteria = (e) => {
        const criteria = e.target.value;
        setCriteria(criteria);
      };

      const handleAddCompany = (e) => {
        e.preventDefault();
    
        setSuccessful(false);
    
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          dispatch(addCompany(companyname, password, role, email,criteria))
            .then(() => {
              setSuccessful(true);
            })
            .catch(() => {
              setSuccessful(false);
            });
        }
      };

  return (
    
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleAddCompany} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="companyname">Company name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="companyname"
                  value={companyname}
                  onChange={onChangeCompanyname}
                  validations={[required, vcompanyname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <Input
                  type="text"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={onChangeRole}
                  validations={[required, validRole]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-dark btn-block">Add Company</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
};

export default AddCompany;
