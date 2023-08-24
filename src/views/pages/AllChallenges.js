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
import { withAlert } from "react-alert";
import { Link } from "react-router-dom";
import {
 deleteChallengeRequest,
 getAllChallengesRequest,
} from "../../api/ApiRequest";
import "../../assets/css/style.css";
// reactstrap components
import {
 Badge,
 Card,
 CardFooter,
 CardHeader,
 Col,
 Container,
 DropdownItem,
 DropdownMenu,
 DropdownToggle,
 Input,
 Pagination,
 PaginationItem,
 PaginationLink,
 Row,
 Table,
 UncontrolledDropdown,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class AllChallenges extends React.Component {
 constructor(props) {
  //

  super(props);
  this.state = {
   number_of_pages: 1,
   search_key: "",
   page: 1,
   limit: 10,
   sort_by: "created_timestamp",
   sort_order: -1,
   challenges_listing: [],
   filter_type: "all",
  };
  this.deleteChallenge = this.deleteChallenge.bind(this);
  this.changePagination = this.changePagination.bind(this);
 }
 componentDidMount() {
  this.getAllChallenges();
 }

 getAllChallenges() {
  getAllChallengesRequest({
   number_of_pages: this.state.number_of_pages,
   search_key: this.state.search_key,
   page: this.state.page,
   limit: this.state.limit,
   sort_by: this.state.sort_by,
   sort_order: this.state.sort_order,
   filter_type: this.state.filter_type,
  })
   .then((response) => {
    if (response.code == 200) {
     let data = response.data;
     let number_of_pages = Math.ceil(response.totalCount / response.limit);
     if (number_of_pages == 0) number_of_pages = 1;
     this.setState({
      challenges_listing: response.data,
      number_of_pages: number_of_pages,
     });
    } else {
     this.props.alert.success(response.msg);
    }
   })
   .catch((e) => {
    this.props.alert.error(e);
   });
 }

 getTableHeadings() {
  return (
   <thead className="thead-light">
    <tr>
     <th scope="col">
      No.{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "number";
        this.state.sort_order = 1;
        this.getAllChallenges();
       }}
       className={"ni ni-bold-up "}
       style={
        this.state.sort_by == "number" && this.state.sort_order == 1
         ? { color: "blue" }
         : {}
       }></i>{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "number";
        this.state.sort_order = -1;
        this.getAllChallenges();
       }}
       className="ni ni-bold-down"
       style={
        this.state.sort_by == "number" && this.state.sort_order == -1
         ? { color: "blue" }
         : {}
       }></i>{" "}
     </th>
     <th scope="col">
      Name{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "name";
        this.state.sort_order = 1;
        this.getAllChallenges();
       }}
       className={"ni ni-bold-up "}
       style={
        this.state.sort_by == "name" && this.state.sort_order == 1
         ? { color: "blue" }
         : {}
       }></i>{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "name";
        this.state.sort_order = -1;
        this.getAllChallenges();
       }}
       className="ni ni-bold-down"
       style={
        this.state.sort_by == "name" && this.state.sort_order == -1
         ? { color: "blue" }
         : {}
       }></i>
     </th>
     <th scope="col">Entries</th>
     <th scope="col">
      Start Date{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "start_date_timestamp";
        this.state.sort_order = 1;
        this.getAllChallenges();
       }}
       className={"ni ni-bold-up "}
       style={
        this.state.sort_by == "start_date_timestamp" &&
        this.state.sort_order == 1
         ? { color: "blue" }
         : {}
       }></i>{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "start_date_timestamp";
        this.state.sort_order = -1;
        this.getAllChallenges();
       }}
       className="ni ni-bold-down"
       style={
        this.state.sort_by == "start_date_timestamp" &&
        this.state.sort_order == -1
         ? { color: "blue" }
         : {}
       }></i>
     </th>
     <th scope="col">
      End Date{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "end_date_timestamp";
        this.state.sort_order = 1;
        this.getAllChallenges();
       }}
       className={"ni ni-bold-up "}
       style={
        this.state.sort_by == "end_date_timestamp" && this.state.sort_order == 1
         ? { color: "blue" }
         : {}
       }></i>{" "}
      <i
       onClick={(e) => {
        this.state.sort_by = "end_date_timestamp";
        this.state.sort_order = -1;
        this.getAllChallenges();
       }}
       className="ni ni-bold-down"
       style={
        this.state.sort_by == "end_date_timestamp" &&
        this.state.sort_order == -1
         ? { color: "blue" }
         : {}
       }></i>
     </th>
     <th scope="col">Type</th>
     <th scope="col">Details</th>
     <th scope="col">Links</th>
     <th scope="col">Actions</th>
    </tr>
   </thead>
  );
 }

 changePagination() {}

 getPagination() {
  let number_of_pages = this.state.number_of_pages;
  let pagiantionItems = [];
  for (let index = 1; index <= number_of_pages; index++) {
   pagiantionItems.push(
    <PaginationItem
     key={index + new Date().valueOf()}
     className={this.state.page == index ? "active" : ""}>
     <PaginationLink
      onClick={(e) => {
       // this.setState({page:index});
       this.state.page = index;
       this.getAllChallenges();
      }}>
      {index}
     </PaginationLink>
    </PaginationItem>
   );
  }

  return (
   <Pagination
    className="pagination justify-content-end mb-0"
    listClassName="justify-content-end mb-0">
    {pagiantionItems}
   </Pagination>
  );
 }

 deleteChallenge(e, id) {
  var isConfimed = window.confirm(
   "Are you sure want to delete this challenge ?"
  );
  if (isConfimed) {
   deleteChallengeRequest(id)
    .then((response) => {
     if (response.code == 200) {
      this.props.alert.success(response.msg);
     } else {
      this.props.alert.success(response.msg);
     }
     this.getAllChallenges();
    })
    .catch((e) => {
     this.props.alert.error(e);
     // this.props.alert.error(e)
    });
  }
 }

 getTableRows() {
  let challenge_rows = [];
  let challenges = this.state.challenges_listing || [];
  for (let index = 0; index < challenges.length; index++) {
   let data = challenges[index];
   let link = "/viewchallenge/" + data._id;
   let leader_redirection_link = "/leaderboard/" + data._id;
   let entries_redirection_link = "/entries/" + data._id;
   let challenge_type = "live";
   if (data.is_submitted_live && data.is_challenge_completed) {
    challenge_type = "past";
   } else if (!data.is_submitted_live && data.is_challenge_completed) {
    challenge_type = "completed";
   }

   let row = (
    <tr>
     <td style={{ textAlign: "center" }}>{data.number}</td>
     <td>{data.name}</td>
     <td style={{ textAlign: "center" }}>
      {data.all_entries && data.all_entries.length > 0
       ? data.all_entries.length
       : 0}
     </td>
     <td>
      {new Date(data.start_date_timestamp).toLocaleString(undefined, {
       timeZone: "Asia/Kolkata",
      })}
     </td>
     <td>
      {new Date(data.end_date_timestamp).toLocaleString(undefined, {
       timeZone: "Asia/Kolkata",
      })}
     </td>
     <td>
      <Badge color="" className="badge-dot">
       {challenge_type == "live" ? (
        <i className="bg-success" />
       ) : challenge_type == "completed" ? (
        <i className="bg-info" />
       ) : (
        <i className="bg-danger" />
       )}
       {challenge_type}
      </Badge>
     </td>
     <td>
      {
       <Link className="" to={link}>
        Details
       </Link>
      }
     </td>
     {challenge_type != "past" && (
      <td>
       <Link className="" to={entries_redirection_link}>
        Entries
       </Link>
      </td>
     )}
     {challenge_type == "past" && (
      <td>
       <Link className="" to={leader_redirection_link}>
        Leaderboard
       </Link>
      </td>
     )}
     {/* <td>{
          <Link
            className=""
            to='#'
          >
            Leaderboard
            </Link>
        }</td> */}
     <td className="text-right">
      <UncontrolledDropdown>
       <DropdownToggle
        className="btn-icon-only text-light"
        role="button"
        size="sm"
        color=""
        onClick={(e) => e.preventDefault()}>
        <i className="fas fa-ellipsis-v" />
       </DropdownToggle>
       <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem onClick={(e) => this.deleteChallenge(e, data._id)}>
         Delete
        </DropdownItem>
       </DropdownMenu>
      </UncontrolledDropdown>
     </td>
    </tr>
   );
   challenge_rows.push(row);
  }

  return challenge_rows;
 }
 render() {
  return (
   <>
    <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
     {/* Table */}
     <Row>
      <div className="col">
       <Card className="shadow">
        <CardHeader className="border-0">
         <Row>
          <Col md="6">
           <h3 className="mb-0">All Challenges</h3>
          </Col>
          <Col md="6">
           <Input
            placeholder="Search"
            value={this.state.search_key}
            onChange={(e) => {
             this.state.search_key = e.target.value;
             this.state.page = 1;
             this.getAllChallenges();
            }}
            type="text"
           />
          </Col>
         </Row>
         {true && (
          <Row>
           <Col md="6">
            <UncontrolledDropdown nav>
             <DropdownToggle className="nav-link-icon">
              Filter : {this.state.filter_type}
             </DropdownToggle>
             <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              left>
              <DropdownItem
               onClick={(e) => {
                this.state.filter_type = "live";
                this.getAllChallenges();
               }}>
               Live
              </DropdownItem>
              <DropdownItem
               onClick={(e) => {
                this.state.filter_type = "past";
                this.getAllChallenges();
               }}>
               Past
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
               onClick={(e) => {
                this.state.filter_type = "completed";
                this.getAllChallenges();
               }}>
               Completed
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
               onClick={(e) => {
                this.state.filter_type = "all";
                this.getAllChallenges();
               }}>
               All
              </DropdownItem>
             </DropdownMenu>
            </UncontrolledDropdown>
           </Col>
          </Row>
         )}

         {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Search" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Form> */}
        </CardHeader>
        <Table
         className="align-items-center table-flush challenges_table"
         responsive>
         {this.getTableHeadings()}
         <tbody>{this.getTableRows()}</tbody>
        </Table>
        <CardFooter className="py-4">
         <nav aria-label="...">{true && this.getPagination()}</nav>
        </CardFooter>
       </Card>
      </div>
     </Row>
    </Container>
   </>
  );
 }
}

// export default AllChallenges;
export default withAlert()(AllChallenges);
