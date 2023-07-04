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
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ProtectedRoute from '../ProtectedRoute'
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes, mainprops) => {
    return routes.map((prop, key) => {
      if (prop.isAppendAdminURl === false) {
        let Component = prop.component;
        return (
          <ProtectedRoute
            path={prop.path}
            // component={prop.component}
            component={() => <Component {...mainprops} isAuthed={true} />}
            key={key}
          />
        );
      } else
        if (prop.layout === "/admin") {

          let Component = prop.component;
          return (
            <ProtectedRoute
              path={prop.layout + prop.path}
              // component={prop.component}
              component={() => <Component {...mainprops} isAuthed={true} />}
              key={key}
            />
          );
        } else {
          return null;
        }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      } else if (routes[i].is_dynamic_path) {


        let lastIndex = props.location.pathname.lastIndexOf("/");
        let page_name = props.location.pathname.substring(1, lastIndex);


        if (routes[i].path.indexOf(page_name) !==
          -1) {

          return routes[i].name;
        }
        // return page_name;
      }
    }
    return "Challenge Details";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes, props)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
