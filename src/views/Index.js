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
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";

import { withAlert } from 'react-alert'
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import {
  addConfigDate,
  getConfigDate,
  exportUser
} from '../api/ApiRequest';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Form,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { setSyntheticLeadingComments } from "typescript";

const Index = (props) => {
  const reactAlert = withAlert()
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [cohortDate, setCohortDate] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [fileLink, setFileLink] = useState("");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const submitDataHandler = event => {
    event.preventDefault();
    setSubmitDisable(true)
    addConfig()
  }
  const addConfig = () => {
    let request = {}
    request.cohortDate = cohortDate
    addConfigDate(request)
      .then((response) => {
        setSubmitDisable(false)
        if (response.code === 200) {
          props.alert.success(response.msg)
        } else {
          props.alert.success(response.msg)
        }
      })
      .catch((e) => {
        setSubmitDisable(false)
      });
  }

  const getConfig = () => {
    getConfigDate()
      .then((response) => {
        if (response.code === 200) {
          let data = response.data;
          if (data.cohortDate) {
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(data.cohortDate - tzoffset)).toISOString().slice(0, 16);
            setCohortDate(localISOTime)
          }
        }
      })
      .catch((e) => {
        console.log('e: ', e);
      });
  }

  useEffect(() => {
    getConfig()
  }, []);
  const handleConfigDate = (event) => {
    setCohortDate(event.target.value)
  }
  const clickExport = () => {
    exportUser()
    .then((response) => {
      if (response.code === 200) {
        if(response.data){
          let a = document.createElement('a');
          a.href = response.data
          a.click();
          props.alert.success("SUCCESS")
        } else {
          props.alert.success("NO_DATA_FOUND")
        }
      } else {
        props.alert.success("NO_DATA_FOUND")
      }
    })
    .catch((e) => {
      console.log("response e", e)
    });
  }
  return (
    <>
      <Header />
      {/* Page content */}
      {/* <Container className="mt--7" fluid> */}
      {<div style={{ padding: "2rem" }} className="form-header-div">
        <Form onSubmit={submitDataHandler}>
          <Row>
          <Col md="4">
            <div className="form-group">
              <label className="form-control-label">Select Cohort Date</label>
              <input onKeyDown={(e) => e.preventDefault()} fieldname="mainDate" onChange={handleConfigDate} className="form-control" type="datetime-local" value={cohortDate} />
            </div>
          </Col>
          <Col md="4" style={{marginTop : '7px'}}>
          <Button disabled={submitDisable} className="my-4" style={{ margin: "0 auto" }} color="primary" type="submit">
            Save Date
          </Button>
          </Col>
          </Row>
          <Row>
          <Col md="4">
            <Button className="my-4" style={{ margin: "0 auto" }} color="primary" onClick={clickExport}>
              Export User Data
            </Button>
          </Col>
          </Row>
        </Form>

      </div>}
      {/* <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      {/* </Container> */}
    </>
  );
};

export default withAlert()(Index);
