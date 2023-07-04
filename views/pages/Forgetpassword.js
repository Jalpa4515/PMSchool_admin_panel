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
import { forgotPassword } from '../AuthRequests';
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { globalStrings } from '../../utils/strings';
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



const ForgetPassword = () => {

  const history = useHistory();
  const alert = useAlert();

  const [email, setFEmail] = useState();

  const formButtonHandler = () => {
    
    forgotPassword(email)
      .then((response) => {
        
        alert.success(globalStrings.check_email);
      })
      .catch((e) => {
        
        alert.error(e);
      });
  }

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    history.push("/auth/login");
  }

  // const handleEmailEnter = (e) => {
  //   e.preventDefault();
  //   // history.push("/auth/register");
  // }

  const handleEmailInput = (event) => {
    setFEmail(event.target.value.replace(/\s/g, ""));
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Reset password</small>
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
                    value={email || ''}
                    onChange={handleEmailInput}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={formButtonHandler}  className="my-4" color="primary" type="button">
                  Reset password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={handleLoginRedirect}
              // to="/auth/forget"
              // onClick={(e) => e.preventDefault()}
            >
              <small>Sign In</small>
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

export default ForgetPassword;
