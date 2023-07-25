/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { signup } from '../AuthRequests';
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { globalStrings } from '../../utils/strings';


const Register = () => {

  const history = useHistory();
  const alert = useAlert();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const loginButtonHandler = () => {
    console.log('here it is');
    console.log('email: ', email);
    console.log('password: ', password);
    signup(email, password , name , password)
      .then((response) => {
        console.log("login sucess", response);
        alert.success(globalStrings.signup_success);
        // localStorage.setItem("PMALoginTime", Date.now());
        // localStorage.setItem("PMAuserId", response['data']['_id']);
        // localStorage.setItem("PMAtoken", response['data']['token']);
        history.push("/admin/index");
        // history.push("/auth/login");
      })
      .catch((e) => {
          alert.error(e);
      });
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      loginButtonHandler();
    }
  }
  const handleEmailInput = (event) => {
    setEmail(event.target.value.replace(/\s/g, ""));
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value.replace(/\s/g, ""));
  }

  const handleNameInput = (event) => {
    setName(event.target.value.replace(/\s/g, ""));
  }
  const signupButtonHandler = (e) => {
    e.preventDefault();
    history.push("/auth/register");
  }

  const handleForgetPassword = (e) => {
    e.preventDefault();
    history.push("/auth/forget");
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" 
                    type="text" 
                    value={name || ''}
                    onChange={handleNameInput}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email || ''}
                    onChange={handleEmailInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password || ''}
                    onChange={handlePasswordInput}
                    onKeyDown={handleEnterPress}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                <Button onClick={loginButtonHandler} className="mt-4" color="primary" type="button">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
