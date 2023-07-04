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
import { changePassword } from '../AuthRequests';
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { globalStrings } from '../../utils/strings';

const ChangePassword = () => {
  const history = useHistory();
  const alert = useAlert();

  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const changePasswordButtonHandler = () => {
    changePassword(email, oldPassword , newPassword)
      .then((response) => {
        
        alert.success(globalStrings.request_success);
        history.push("/auth/login");
      })
      .catch((e) => {
        
        if (e == "INVALID_CREDENTIALS") {
          alert.error(globalStrings.invalid_ced);
        } else {
          alert.error(e);
        }
      });
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      changePasswordButtonHandler();
    }
  }
  const handleEmailInput = (event) => {
    setEmail(event.target.value.replace(/\s/g, ""));
  }

  const handleNewPasswordInput = (event) => {
    setNewPassword(event.target.value.replace(/\s/g, ""));
  }
  const handleOldPasswordInput = (event) => {
    setOldPassword(event.target.value.replace(/\s/g, ""));
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
                    placeholder="Old Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={oldPassword || ''}
                    onChange={handleOldPasswordInput}
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
                    placeholder="New Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={newPassword || ''}
                    onChange={handleNewPasswordInput}
                    onKeyDown={handleEnterPress}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={changePasswordButtonHandler} className="my-4" color="primary" type="button">
                  Change password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ChangePassword;
