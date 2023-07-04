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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/nucleo/css/nucleo.css";
// import 'assets/css/test.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ProtectedRoute from './ProtectedRoute'
import AddChallenge from "views/pages/AddChallenge.js";
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter basename="/cms">
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/viewchallenge/:id" render={(props) => <AdminLayout {...props} />} />
        <Route path="/entries/:id" render={(props) => <AdminLayout {...props} />} />
        <Route path="/leaderboard/:id" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById("root")
);
