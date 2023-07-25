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
import { login } from '../AuthRequests';
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { globalStrings } from '../../utils/strings';

const Login = () => {
  const history = useHistory();
  const alert = useAlert();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginButtonHandler = () => {
    
    
    
    login(email, password)
      .then((response) => {
        
        alert.success(globalStrings.login_success);
        localStorage.setItem("PMALoginTime", Date.now());
        localStorage.setItem("PMAuserId", response['data']['_id']);
        localStorage.setItem("PMAtoken", response['data']['token']);
        history.push("/admin/dashboard");
      })
      .catch((e) => {
        
        if (e == "INVALID_CREDENTIALS") {
          alert.error(globalStrings.invalid_ced);
        } else {
          alert.error(e);
        }
      });
  }

  const signupButtonHandler = (e) => {
    e.preventDefault();
    history.push("/auth/register");
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



  const handleForgetPassword = (e) => {
    e.preventDefault();
    history.push("/auth/forget");
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    required
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
                    required
                    value={password || ''}
                    onChange={handlePasswordInput}
                    onKeyDown={handleEnterPress}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button onClick={loginButtonHandler} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={handleForgetPassword}
              // to="/auth/forget"
              // onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          {/* <Col className="text-right" xs="6">
            <a
              className="text-light"
              onClick={signupButtonHandler}
              // onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default Login;
