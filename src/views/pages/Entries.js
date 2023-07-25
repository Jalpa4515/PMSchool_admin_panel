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
    getAllChallengesRequest, getChallengeEntriesRequest, submitToLiveRequest
    , updateRankRequest, autoRankRequest, exportLeaderboard
} from '../../api/ApiRequest';
import '../../assets/css/style.css'
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Modal,
    Button,
    InputGroup,
    Navbar,
    Nav,
    NavbarBrand,
    Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Entries extends React.Component {

    constructor(props) {
        // 
        let current_marks = [];
        let curret_selected_entry = {};
        let current_selected_rank = 0;
        let current_selected_remarks = '';
        let rank_submit_error = '';
        let challenge_name = '';
        super(props);
        this.state = {
            number_of_pages: 1,
            search_key: '',
            page: 1,
            limit: 10,
            sort_by: 'created_timestamp',
            sort_order: -1,
            entries_listing: [],
            filter_type: 'all',
            challenge: undefined,
            rankingModal: false,
            isAllEntriesRanked: false
        }
        this.changePagination = this.changePagination.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeRankingData = this.changeRankingData.bind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.id) {
            this.state.challenge_id = params.id
            this.getEntries()
        }
        this.getEntries();
    }

    toggleModal = (state, index) => {

        this.curret_selected_entry = {};
        this.current_marks = [];
        // this.current_selected_rank = 0;
        this.current_selected_remarks = '';
        this.rank_submit_error = '';


        //init the current_marks array with size equal to that challenge categories
        if (this.state.challenge)
            this.current_marks = this.state.challenge.categories_listing;

        //if admin is trying to re-evaluate someone's marks then fetch their existing marks here
        if (index != undefined) {
            if (this.state.entries_listing[index]['rank_details']) {
                this.current_marks = this.state.entries_listing[index]['rank_details']['categories_marks'];
                // this.current_selected_rank = this.state.entries_listing[index]['rank_details']['rank'];
                this.current_selected_remarks = this.state.entries_listing[index]['rank_details']['remark_text'];;
            }
            if (this.state.entries_listing[index])
                this.curret_selected_entry = this.state.entries_listing[index];
        }
        this.setState({
            rankingModal: !this.state['rankingModal']
        });
    };

    getEntries() {
        getChallengeEntriesRequest({
            number_of_pages: this.state.number_of_pages,
            search_key: this.state.search_key,
            page: this.state.page,
            limit: this.state.limit,
            sort_by: this.state.sort_by,
            sort_order: this.state.sort_order,
            filter_type: this.state.filter_type,
            challenge_id: this.state.challenge_id
        })
            .then((response) => {

                if (response.code == 200) {

                    let data = response.data;
                    let number_of_pages = Math.ceil(response.totalCount / response.limit);
                    if (number_of_pages == 0)
                        number_of_pages = 1;
                    if (response.challenge_data.name)
                        this.challenge_name = response.challenge_data.name || '';
                    this.setState({ isAllEntriesRanked: response.isAllEntriesRanked || false, entries_listing: response.data, number_of_pages: number_of_pages, challenge: response.challenge_data })
                } else {
                    this.props.alert.success(response.msg)
                }
            })
            .catch((e) => {

                this.props.alert.error(e)
            });
    }

    getTableHeadings() {

        let dynamic_cat_headings = [];
        if (this.state.challenge != {} && this.state.entries_listing.length > 0) {

            for (let index = 0; index < this.state.challenge.categories_listing.length; index++) {
                dynamic_cat_headings.push(<th scope="col">{this.state.challenge.categories_listing[index]['title']}</th>)
            }
        }

        return (
            <thead className="thead-light">
                <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Submitted Date
                        <i onClick={e => { this.state.sort_by = 'created_timestamp'; this.state.sort_order = 1; this.getEntries(); }} className={"ni ni-bold-up "} style={(this.state.sort_by == 'created_timestamp' && this.state.sort_order == 1 ? { color: "blue" } : {})} >
                        </i> <i onClick={e => { this.state.sort_by = 'created_timestamp'; this.state.sort_order = -1; this.getEntries(); }} className="ni ni-bold-down" style={(this.state.sort_by == 'created_timestamp' && this.state.sort_order == -1 ? { color: "blue" } : {})}></i>
                    </th>
                    <th scope="col">PDF</th>
                    <th scope="col">Remark</th>
                    {/* <th scope="col">Challenge</th> */}
                    <th scope="col">Rank
                        <i onClick={e => { this.state.sort_by = 'rank'; this.state.sort_order = 1; this.getEntries(); }} className={"ni ni-bold-up "} style={(this.state.sort_by == 'rank' && this.state.sort_order == 1 ? { color: "blue" } : {})} >
                        </i> <i onClick={e => { this.state.sort_by = 'rank'; this.state.sort_order = -1; this.getEntries(); }} className="ni ni-bold-down" style={(this.state.sort_by == 'rank' && this.state.sort_order == -1 ? { color: "blue" } : {})}></i>
                    </th>
                    <th scope="col">Rank Status</th>
                    <th scope="col">Total Score</th>
                    {/* Show this column and button only if challenge is not submitted to live */}
                    {this.state.challenge && !this.state.challenge.is_submitted_live && <th scope="col">Entries</th>}
                    {dynamic_cat_headings}
                </tr>
            </thead>
        );
    }


    changePagination() {

    }

    getPagination() {
        let number_of_pages = this.state.number_of_pages;
        let pagiantionItems = [];
        for (let index = 1; index <= number_of_pages; index++) {
            pagiantionItems.push(
                <PaginationItem key={index + new Date().valueOf()} className={this.state.page == index ? "active" : ''}>
                    <PaginationLink
                        onClick={(e) => {
                            this.state.page = index;
                            this.getEntries();
                        }}
                    >
                        {index}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return (<Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
        >
            {pagiantionItems}
        </Pagination>);
    }

    getTableRows() {
        let challenge_rows = [];
        let entries = this.state.entries_listing || [];


        for (let index = 0; index < entries.length; index++) {

            let data = entries[index];
            let categories_data = [];
            let total_score = 0;
            if (data.rank_details)
                for (let index2 = 0; index2 < data.rank_details.categories_marks.length; index2++) {
                    total_score = total_score + data.rank_details.categories_marks[index2]['marks'];
                    categories_data.push(<td style={{ textAlign: "center" }}>{data.rank_details.categories_marks[index2]['marks']}</td>)
                }
            else
                for (let index2 = 0; index2 < this.state.challenge.categories_listing.length; index2++) {
                    categories_data.push(<td></td>)
                }

            let link = data.entry_pdf;
            let row = <tr>
                <td style={{ textAlign: "center" }} >{index + 1}</td>
                <td>{data.user_name}</td>
                <td><div style={{ width: '200px' }}>{data.email || ''}</div></td>
                <td>
                    {new Date(data.created_timestamp).toISOString().slice(0, 10) + ' ' +
                        new Date(data.created_timestamp).toISOString().slice(11, 16)}
                </td>
                <td>{
                    <a
                        className=""
                        href={link}
                        target="_blank"
                    >
                        PDF
                    </a>
                }</td>
                <td><div className="scroll" style={{ width: "200px", overflowX: "scroll" }}>
                    <p>
                        {data.remark_text}
                    </p>
                </div></td>
                <td style={{ textAlign: "center" }}>{data.rank_details ? data.rank_details.rank : ''}</td>
                <td>{data.rank_details ? 'YES' : 'NO'}</td>
                <td style={{ textAlign: "center" }}>{total_score}</td>
                {/* Show this button only if challenge is not submitted to live */}
                {this.state.challenge && !this.state.challenge.is_submitted_live && <td><Button onClick={() => this.toggleModal("rankingModal", index)}>{data.rank_details ? "Re-evaluate" : "Evaluate"}</Button></td>}
                {categories_data}
            </tr>;
            challenge_rows.push(
                row
            )
        }

        return (challenge_rows)
    }

    // ranking data change handler
    changeRankingData(type, event, index = undefined, maxmarks = 0) {
        if (type == 'marks') {
            if (!parseInt(event.target.value)) {
                this.current_marks[index]['marks'] = 0;
            }
            else if (parseInt(event.target.value) <= maxmarks) {
                this.current_marks[index]['marks'] = parseInt(event.target.value);
            }
        }
        else if (type == 'rank')
            this.current_selected_rank = parseInt(event.target.value);
        else if (type == 'remarks')
            this.current_selected_remarks = event.target.value;
        this.forceUpdate();
    }

    submitDataHandler = event => {

        event.preventDefault();
        if (this.state.challenge._id) {
            submitToLiveRequest({ challenge_id: this.state.challenge._id })
                .then((response) => {

                    if (response.code == 200) {
                        this.props.alert.success(response.msg)
                    } else {
                        this.props.alert.success(response.msg)
                    }
                })
                .catch((e) => {
                    this.props.alert.error(e)
                });
        }

    }

    autoRankHandler = event => {

        event.preventDefault();
        if (this.state.challenge._id) {
            autoRankRequest({ challenge_id: this.state.challenge._id })
                .then((response) => {

                    if (response.code == 200) {
                        this.props.alert.success(response.msg)
                        this.getEntries();
                    } else {
                        this.props.alert.success(response.msg)
                    }
                })
                .catch((e) => {
                    this.props.alert.error(e)
                });
        }

    }

    //saves ranking evaluation / reevaluation
    submitRankingForStudent = event => {
        if (this.state.challenge && this.curret_selected_entry) {
            let marks = [];
            for (let index = 0; index < this.current_marks.length; index++) {
                marks.push({ marks: this.current_marks[index]['marks'] || 0 })
            }
            let rankobject = {
                challenge_id: this.state.challenge._id,
                entry_id: this.curret_selected_entry._id,
                user_id: this.curret_selected_entry.user_id,
                categories_marks: marks,
                // rank: this.current_selected_rank,
                remark_text: this.current_selected_remarks
            }

            this.updateRank(rankobject);

        }

    }


    updateRank(data) {
        updateRankRequest(data)
            .then((response) => {

                if (response.code == 200) {

                    this.toggleModal("rankingModal")
                    this.props.alert.success(response.msg)
                    this.getEntries();
                } else {

                    this.rank_submit_error = response.msg;
                    this.props.alert.error(response.msg)
                }
            })
            .catch((e) => {

                this.rank_submit_error = e;
                this.forceUpdate();
                // this.props.alert.error(e)
            });
    }


    //this provides the form for rank evaluation / reevaluation
    getRankingDynamicCategoriesInputField() {
        let rows = [];
        if (this.state.challenge != {} && this.state.entries_listing.length > 0) {
            for (let index = 0; index < this.state.challenge.categories_listing.length; index++) {
                rows.push(
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label>{this.state.challenge.categories_listing[index]['title']}</label>
                                <Input
                                    placeholder="Marks"
                                    type="Number"
                                    min={0}
                                    max={this.state.challenge.categories_listing[index]['out_of_score']}
                                    fieldname={"mark_" + index}
                                    onChange={e => { this.changeRankingData('marks', e, index, this.state.challenge.categories_listing[index]['out_of_score']) }}
                                    value={this.current_marks && this.current_marks.length > 0 ? this.current_marks[index]['marks'] || 0 : 0}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Out Of Marks</label>
                                <Input
                                    readOnly
                                    placeholder="Marks"
                                    type="text"
                                    fieldname="out_of_marks"
                                    value={this.state.challenge.categories_listing[index]['out_of_score']}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                )

            }

            rows.push(
                <Row>
                    {/* <Col md="6">
                        <FormGroup>
                            <label>Rank</label>
                            <Input
                                placeholder="Marks"
                                type="number"
                                fieldname="rank"
                                min={0}
                                max={5}
                                value={this.current_selected_rank}
                                onChange={e => { this.changeRankingData('rank', e) }}
                            />
                        </FormGroup>
                    </Col> */}
                    <Col md="6">
                        <FormGroup>
                            <label>Remark</label>
                            <Input
                                placeholder="Remark"
                                type="text"
                                fieldname="out_of_marks"
                                value={this.current_selected_remarks}
                                onChange={e => { this.changeRankingData('remarks', e) }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            )
        }


        return rows;
    }

    clickExport = () => {
        exportLeaderboard({ challenge_id: this.state.challenge._id, type : "live" })
            .then((response) => {
                if (response.code === 200) {
                    if (response.data) {
                        let a = document.createElement('a');
                        a.href = response.data
                        a.click();
                        this.props.alert.success("SUCCESS")
                    } else {
                        this.props.alert.success("NO_DATA_FOUND")
                    }
                } else {
                    this.props.alert.success("NO_DATA_FOUND")
                }
            })
            .catch((e) => {
                console.log("response e", e)
            });
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
                                            <h3 className="mb-0">Entries {this.challenge_name && ": " + this.challenge_name} </h3>
                                        </Col>
                                        <Col md="6">
                                            <Input placeholder="Search"
                                                value={this.state.search_key}
                                                onChange={e => { this.state.search_key = e.target.value; this.state.page = 1; this.getEntries(); }}
                                                type="text" />
                                        </Col>
                                    </Row>
                                    {true && <Row>
                                        <Col md="6">
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link-icon">
                                                    Filter : {this.state.filter_type}
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    aria-labelledby="navbar-default_dropdown_1"
                                                    className="dropdown-menu-arrow"
                                                    left
                                                >
                                                    <DropdownItem
                                                        onClick={e => { this.state.filter_type = 'ranked'; this.getEntries(); }}
                                                    >Ranked</DropdownItem>
                                                    <DropdownItem
                                                        onClick={e => { this.state.filter_type = 'unranked'; this.getEntries(); }}
                                                    >Unranked</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem
                                                        onClick={e => { this.state.filter_type = 'all'; this.getEntries(); }}
                                                    >All</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>


                                    </Row>}
                                </CardHeader>
                                <Table className="align-items-center table-flush challenges_table" responsive>
                                    {this.getTableHeadings()}
                                    <tbody>
                                        {this.getTableRows()}
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    {/* Show Submit to live button only if challenge is not submitted to live */}
                                    {/* disable this button if All entries are not ranked under a challenge */}
                                    {this.state.challenge && !this.state.challenge.is_submitted_live && <Button disabled={!this.state.isAllEntriesRanked} onClick={this.submitDataHandler} color="primary" type="button">
                                        Submit to live
                                    </Button>}
                                    {this.state.challenge && !this.state.challenge.is_submitted_live && <Button disabled={!this.state.isAllEntriesRanked} onClick={this.autoRankHandler} color="primary" type="button">
                                        Arrange Rank
                                    </Button>
                                    }
                                    <Button onClick={this.clickExport} color="primary" type="button">
                                        Export
                                    </Button>
                                    <nav aria-label="...">
                                        {
                                            true &&
                                            this.getPagination()
                                        }

                                    </nav>

                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                    <Modal
                        className="modal-dialog-centered modal-lg"
                        isOpen={this.state.rankingModal}
                        toggle={() => this.toggleModal("rankingModal")}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Ranking
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("rankingModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.getRankingDynamicCategoriesInputField()}
                            <Row>
                                <Col style={{ textAlign: "center" }} md="12">
                                    <Label style={{ color: "red" }}>
                                        {this.rank_submit_error}
                                    </Label>
                                </Col>
                            </Row>

                        </div>
                        <div className="modal-footer">

                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("rankingModal")}
                            >
                                Close
                            </Button>
                            <Button onClick={this.submitRankingForStudent} color="primary" type="button">
                                Save changes
                            </Button>
                        </div>
                    </Modal>
                </Container>
            </>
        );
    }
}


// export default Entries;
export default withAlert()(Entries)