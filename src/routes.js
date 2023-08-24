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
import Index from "views/Index.js";
import AddChallenge from "views/pages/AddChallenge.js";
import AllChallenges from "views/pages/AllChallenges.js";
import ChangePassword from "views/pages/Changepassword.js";
import Entries from "views/pages/Entries.js";
import ForgetPassword from "views/pages/Forgetpassword.js";
import Leaderboard from "views/pages/Leaderboard.js";
import Login from "views/pages/Login.js";
import PmRun from "views/pages/PmRun";
import Register from "views/pages/Register.js";
import Tables from "views/pages/Tables.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    isShowOnNavbar: true,
    layout: "/admin",
  },
  {
    path: "/pm_run",
    name: "PM Run",
    icon: "ni ni-bullet-list-67 text-red",
    component: PmRun,
    isShowOnNavbar: true,
    isAppendAdminURl: true,
    layout: "/admin",
  },
  {
    path: "/addchallenge",
    name: "Add Challenge",
    icon: "ni ni-tv-2 text-primary",
    component: AddChallenge,
    isShowOnNavbar: true,
    layout: "/admin",
  },
  {
    path: "/viewchallenge/:id",
    name: "Challenge Details",
    icon: "ni ni-tv-2 text-primary",
    component: AddChallenge,
    isShowOnNavbar: false,
    is_dynamic_path: true,
    isAppendAdminURl: false,
    layout: "/admin",
  },
  {
    path: "/all_challenges",
    name: "All Challenges",
    icon: "ni ni-bullet-list-67 text-red",
    component: AllChallenges,
    isShowOnNavbar: true,
    isAppendAdminURl: true,
    layout: "/admin",
  },
  {
    path: "/entries/:id",
    name: "Challenge Entries",
    icon: "ni ni-tv-2 text-primary",
    component: Entries,
    isShowOnNavbar: false,
    isAppendAdminURl: false,
    is_dynamic_path: true,
    layout: "/admin",
  },
  {
    path: "/leaderboard/:id",
    name: "Challenge Leaderboard",
    icon: "ni ni-tv-2 text-primary",
    component: Leaderboard,
    isShowOnNavbar: false,
    isAppendAdminURl: false,
    is_dynamic_path: true,
    layout: "/admin",
  },
  // {
  //   path: "/forms",
  //   name: "forms",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Forms,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    isShowOnNavbar: false,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    isShowOnNavbar: false,
    layout: "/auth",
  },
  {
    path: "/forget",
    name: "Forget Password",
    icon: "ni ni-key-25 text-info",
    component: ForgetPassword,
    isShowOnNavbar: false,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    isShowOnNavbar: false,
    layout: "/auth",
  },
  {
    path: "/change_passwword",
    name: "Change Password",
    icon: "ni ni-circle-08 text-pink",
    component: ChangePassword,
    isShowOnNavbar: false,
    layout: "/auth",
  },
];
export default routes;
