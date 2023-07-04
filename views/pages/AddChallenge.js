import React from "react";
// import ReactQuill from 'react-quill'; // ES6
import { withAlert } from "react-alert";
import {
    addChallengeRequest,
    getChallengeRequest,
    updateChallengeRequest
} from '../../api/ApiRequest';
import '../../assets/css/style.css'
// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import JoditEditor from "jodit-react";
const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
}
class AddChallenge extends React.Component {
    file_label = "Select Image"
    file_label_logo = "Select Logo"
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleRTEChange = this.handleRTEChange.bind(this);
        this.handleStartDateTimeChange = this.handleStartDateTimeChange.bind(this);
        this.handleEndDateTimeChange = this.handleEndDateTimeChange.bind(this);
        this.changeHeadingData = this.changeHeadingData.bind(this);
        this.handleCategoryDataChange = this.handleCategoryDataChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleLogoChange = this.handleLogoChange.bind(this)
        this.clearImageInput = this.clearImageInput.bind(this);
        this.clearLogoInput = this.clearLogoInput.bind(this);
        this.categories_listing= [{"title" : 'Structure of document and writing skills'}, 
        {"title": 'Design sense and wireframing'}, 
        {"title": 'Creative problem solving'}, 
        {"title": 'Metrics thinking'}, 
        {"title": 'Go-to-market'},
        {"title": 'Tech understanding'},
        {"title": 'Market sizing'}];
        this.categoryExist = []
        this.state = {
            is_submit_disabled: false,
            is_readOnly: false,
            currentChallengeId: '',
            name: '',
            number: 0,
            start_date_timestamp: '',
            end_date_timestamp: '',
            points: 0,
            persona_text: '',
            challenge_text: '',
            type_text: '',
            winners_get_text: '',
            winners_get_text2: '',
            winners_get_text3: '',
            // headings: ['', ''],
            detail_text: '',
            evaluation_criteria_text: '',
            // categories_listing: [{"title" : 'Structure of document and writing skills'}, 
            // {"title": 'Design sense and wireframing'}, 
            // {"title": 'Creative problem solving'}, 
            // {"title": 'Metrics thinking'}, 
            // {"title": 'Go-to-market'},
            // {"title": 'Tech understanding'},
            // {"title": 'Market sizing'}],
            // categories_listing: [{}, {}, {}, {}, {}],
            editImage: false,
            editLogo: false
        }
    }
    setContent = (content) => {
        this.setState({
            challenge_text: content
        })
    }
    componentDidMount() {
        // console.clear();

        const { match: { params } } = this.props;
        if (params && params.id) {


            // this.state.currentChallengeId = "609b98635dd574d24fbe3173";
            // this.state.currentChallengeId = params.id
            this.setState({
                currentChallengeId: params.id
            })
            // 
            this.getChallengeDetails(params.id)
        }
    }

    getChallengeDetails(id) {
        console.log('id: ', id);

        getChallengeRequest(id)
            .then((response) => {
                console.log('response: ', response);




                if (response.code === 200) {
                    let data = response.data.challenge;

                    this.setState({ ...data })
                    if (data.start_date_timestamp) {

                        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                        var localISOTime = (new Date(data.start_date_timestamp - tzoffset)).toISOString().slice(0, 16);
           
                        this.setState({
                            start_date_timestamp: localISOTime
                        })
                    }
                    if (data.end_date_timestamp) {
                        var tzoffset1 = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                        var localISOTime1 = (new Date(data.end_date_timestamp - tzoffset1)).toISOString().slice(0, 16);

                        this.setState({
                            end_date_timestamp: localISOTime1
                        })
                    }
                    if (data.is_challenge_completed) {
                        this.setState({
                            is_readOnly: true
                        })
                    }

                    for(let i=0; i < data.categories_listing.length; i++){
                        let category = data.categories_listing[i]
                        if(category.title == "Structure of document and writing skills"){
                            this.setState({category0 : category.out_of_score})
                            this.categories_listing[0]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Design sense and wireframing"){
                            this.setState({category1 : category.out_of_score})
                            this.categories_listing[1]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Creative problem solving"){
                            this.setState({category2 : category.out_of_score})
                            this.categories_listing[2]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Metrics thinking"){
                            this.setState({category3 : category.out_of_score})
                            this.categories_listing[3]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Go-to-market"){
                            this.setState({category4 : category.out_of_score})
                            this.categories_listing[4]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Tech understanding"){
                            this.setState({category5 : category.out_of_score})
                            this.categories_listing[5]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                        if(category.title == "Market sizing"){
                            this.setState({category6 : category.out_of_score})
                            this.categories_listing[6]['out_of_score'] =  category.out_of_score
                            this.categoryExist.push(category.title)
                        }
                    }
                    // this.setState({
                    //     is_readOnly: true
                    // })

                    // this.props.alert.success(response.msg)
                } else {
                    // this.props.alert.success(response.msg)
                }
            })
            .catch((e) => {
                console.log('e: ', e);

                // this.props.alert.error(e)
            });
    }

    //value change handled for text and number values
    handleValueChange(event) {
        let formField = event.target.attributes.fieldname.value
        this.setState({ [formField]: event.target.value })
    }

    handleRTEChange(eventValue, field_name) {

        //if the RTE is disabled then save normal text
        if (eventValue && eventValue.target) {
            let formField = eventValue.target.attributes.fieldname.value

            this.setState({ [formField]: eventValue.target.value })
        } else {
            this.setState({ [field_name]: eventValue })
        }
    }

    handleStartDateTimeChange(event) {
        this.setState({ 'start_date_timestamp': event.target.value })
    }

    handleEndDateTimeChange(event) {
        this.setState({ 'end_date_timestamp': event.target.value })
    }

    changeHeadingData(event, index) {
        this.state.headings[index] = event.target.value
        this.forceUpdate();
    }

    submitDataHandler = event => {
        event.preventDefault();
        let categoryArray = this.categories_listing.filter(function(item){
            return item.out_of_score && item.out_of_score != "" && item.out_of_score != undefined
        });
        this.setState({
            categories_listing : categoryArray
        }, ()=>{
            this.setState({ 'is_submit_disabled': true });
            if (this.state.currentChallengeId !== '') {
                this.updateChallenge(this.state)
            } else {
                this.addChallenge(this.state)
            }
        })
       
        // this.addChallenge(this.state)
    }

    addChallenge(data) {

        addChallengeRequest(data)
            .then((response) => {
                this.setState({ 'is_submit_disabled': false });
                if (response.code === 200) {
                    this.props.alert.success(response.msg);
                } else {
                    this.props.alert.success(response.msg)
                }
                this.props.history.push('/admin/all_challenges')
            })
            .catch((e) => {
                this.setState({ 'is_submit_disabled': false });
                this.props.alert.error(e)
            });
    }

    updateChallenge(data) {

        updateChallengeRequest(data)
            .then((response) => {
                this.setState({ 'is_submit_disabled': false });
                if (response.code === 200) {
                    this.props.alert.success(response.msg);
                } else {
                    this.props.alert.success(response.msg)
                }
                this.props.history.push('/admin/all_challenges')
            })
            .catch((e) => {
                this.setState({ 'is_submit_disabled': false });
                this.props.alert.error(e)
            });
    }

    // validateChallenge(data){
    //     return {
    //         isDataValid : false,
    //         error : 'Name is Missing'
    //     }
    // }

    handleCategoryDataChange(event, type, index, title) {

        let categoryCount = this.categories_listing.filter(function(item){
            return item.out_of_score && item.out_of_score != "" && item.out_of_score != undefined
        }).length;

        if (categoryCount < 5 || this.categoryExist.includes(title)) {
            this.setState({
                [type] : event.target.value
            })
            this.categories_listing[index]['out_of_score'] =  event.target.value;
            if (event.target.value == "" || event.target.value == undefined || event.target.value == null) {
                const index = this.categoryExist.indexOf(title);
                if (index > -1) {
                    this.categoryExist.splice(index, 1);
                }
            } else {
                if(!this.categoryExist.includes(title))
                    this.categoryExist.push(title)
            }
            
        } else {
            this.setState({
                [type] : ""
            })
            this.categories_listing[index]['out_of_score'] = "";
        }

    }
    // modules = {
    //     toolbar: [
    //       [{ 'header': [1, 2, false] }],
    //       ['bold', 'italic', 'underline','strike', 'blockquote'],
    //       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //       ['link', 'image'],
    //       ['clean']
    //     ],
    //   }

    getAllHeadings() {
        return (
            <div style={{ display: "contents" }}>
                <Col md="12">
                    <label>Details about the Challenge - Heading</label>
                    <FormGroup>
                        <Input
                            readOnly={this.state.is_readOnly}
                            value={this.state.headings[0]}
                            onChange={e => { this.changeHeadingData(e, 0) }}
                            placeholder="Heading 1"
                            type="text"
                        />
                        <small>Minimum 10 characters</small>
                    </FormGroup>
                </Col>
                <Col md="12">
                    <label>Details about the Challenge - Body</label>
                    <FormGroup>
                        <Input
                            readOnly={this.state.is_readOnly}
                            value={this.state.headings[1]}
                            onChange={e => { this.changeHeadingData(e, 1) }}
                            placeholder="Heading 2"
                            type="text"
                        />
                        <small>Minimum 40 characters</small>
                    </FormGroup>
                </Col>
            </div>
        )
    }


    getDynamicCategories() {
    }

    getAllCategoriesListing() {
        let categories_divs = [];

        for (let index = 0; index < this.categories_listing.length; index++) {
            categories_divs.push(
                <Col md="6">
                    <FormGroup>
                        <Input value={this.categories_listing[index]['title']} readOnly={true} placeholder={"Category " + (index + 1)} onChange={e => this.handleCategoryDataChange(e, 'heading', index)} type="text" />
                    </FormGroup>
                </Col>
            )
            categories_divs.push(
                <Col md="6">
                    <FormGroup>
                        <Input value={this.state['category' + index]} readOnly={this.state.is_readOnly} min="0" max="100" placeholder={"Score " + (index + 1)} onChange={e => this.handleCategoryDataChange(e, 'category' + index, index, this.categories_listing[index]['title'])} type="number" />
                    </FormGroup>
                </Col>
            )
        }
        return (
            <div style={{ display: "contents" }}>
                <br></br>
                {categories_divs}
            </div>
        )
    }

    modules = {
        toolbar: false,
    }


    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    handleImageChange(event) {
        let file = event.target.files[0];

        if (file) {

            this.file_label = file['name'];
            this.getBase64(file)
                .then(result => {
                    this.setState({
                        image: result,
                        file: file
                    });
                    if (this.state.currentChallengeId) {
                        this.setState({
                            editImage: true
                        })
                    }
                })
                .catch(err => {

                });
        }
    }

    handleLogoChange(event) {
        let file = event.target.files[0];

        if (file) {

            this.file_label_logo = file['name'];
            this.getBase64(file)
                .then(result => {
                    this.setState({
                        logo: result,
                        fileLogo: file
                    });
                    if (this.state.currentChallengeId) {
                        this.setState({
                            editLogo: true
                        })
                    }
                })
                .catch(err => {

                });
        }
    }


    // getChallengeImage(){
    //     if(this.state.image) {
    //         
    //         return(
    //             <div>
    //                 <img className="challenge_details_image" src={"https://pmschool.io:4000/"+this.state.image} />    
    //             </div>
    //         )
    //     } else {
    //         return null;
    //     }


    // }


    clearImageInput(event) {
        this.file_label = "Select Image";
        this.setState({
            image: '',
            file: {}
        });
    }

    clearLogoInput(event) {
        this.file_label_logo = "Select Logo";
        this.setState({
            imageLogo: '',
            fileLogo: {}
        });
    }
    render() {

        // const alert = this.props.alert;
        return (
            <>
                {<div className="header bg-gradient-info pb-2 pt-2 pt-md-8">

                </div>
                }
                {<div style={{ padding: "2rem" }} className="form-header-div">


                    <Form onSubmit={this.submitDataHandler}>
                        <Row>
                            <Col md="8">
                                <FormGroup>
                                    <label>Challenge Name</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        placeholder="Name"
                                        type="text"
                                        fieldname="name"
                                        value={this.state.name}
                                        onChange={this.handleValueChange}
                                    />
                                    <small>Minimum 30 characters</small>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <label>Challenge Number</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        fieldname="number"
                                        value={this.state.number}
                                        onChange={this.handleValueChange}
                                        placeholder="Number"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <label>Upload Image</label>
                                    <div className="custom-file">
                                        <input disabled={this.state.is_readOnly} onChange={this.handleImageChange} type="file" className="custom-file-input" lang="en" />
                                        <label className="custom-file-label" >{this.file_label}</label>
                                        {
                                            !this.state.is_readOnly &&
                                            <i onClick={this.clearImageInput} className="ni ni-fat-delete delete-file-icon" />
                                        }
                                    </div>
                                    <small>Min size 100 * 100 px</small>
                                    <br></br>
                                    <small>Max 1 MB</small>
                                    {
                                        this.state.is_readOnly &&
                                        <div>
                                            <img className="challenge_details_image" src={this.state.image} />
                                        </div>
                                    }
                                </FormGroup>
                            </Col>

                            <Col md="4">
                                <FormGroup>
                                    <label>Upload Logo</label>
                                    <div className="custom-file">
                                        <input disabled={this.state.is_readOnly} onChange={this.handleLogoChange} type="file" id="avatar" name="avatar" className="custom-file-input" lang="en" />
                                        <label className="custom-file-label" >{this.file_label_logo}</label>
                                        {
                                            !this.state.is_readOnly &&
                                            <i onClick={this.clearLogoInput} className="ni ni-fat-delete delete-file-icon" />
                                        }
                                    </div>
                                    {/* <small>Min size 100 * 100 px</small> */}
                                    <br></br>
                                    <small>Max 1 MB</small>
                                    {
                                        this.state.is_readOnly &&
                                        <div>
                                            <img className="challenge_details_image" src={this.state.logo} />
                                        </div>
                                    }
                                </FormGroup>
                            </Col>


                            <Col md="4">
                                {/* <FormGroup>
                                    <label>Start Date</label>
                                    <Input placeholder="" fieldname="start_date_timestamp" type="date" />
                                </FormGroup> */}
                                <div className="form-group">
                                    <label className="form-control-label">Start Date</label>
                                    <input onKeyDown={(e) => e.preventDefault()} readOnly={this.state.is_readOnly} fieldname="start_date_timestamp" onChange={this.handleStartDateTimeChange} className="form-control" type="datetime-local" value={this.state.start_date_timestamp} />
                                </div>
                            </Col>
                            <Col md="4">
                                {/* <FormGroup>
                                    <label>End Date</label>
                                    <Input placeholder="" fieldname="end_date_timestamp" type="date" />
                                </FormGroup> */}
                                <div className="form-group">
                                    <label className="form-control-label">End Date (Deadline)</label>
                                    <input onKeyDown={(e) => e.preventDefault()} readOnly={this.state.is_readOnly} fieldname="end_date_timestamp" onChange={this.handleEndDateTimeChange} className="form-control" type="datetime-local" value={this.state.end_date_timestamp} />
                                </div>
                            </Col>





                            <Col md="12">
                                <FormGroup>
                                    <label>You are?</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.persona_text}
                                        fieldname="persona_text"
                                        onChange={(value) => this.handleRTEChange(value, 'persona_text')}
                                    />
                                    <small>Minimum 20 characters</small>
                                </FormGroup>
                            </Col>


                            <Col md="12">
                                <FormGroup>
                                    <label>The Challenge is?</label>
                                    <JoditEditor
                                        // ref={editor}
                                        value={this.state.challenge_text}
                                        config={{readOnly : this.state.is_readOnly}}
                                        tabIndex={5} // tabIndex of textarea
                                        onBlur={newContent => this.setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    // onChange={newContent => { }}
                                    />
                                    <small>Minimum 400 characters</small>
                                </FormGroup>
                            </Col>


                            <Col md="12">
                                <FormGroup>
                                <label>Short Challenge Description</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.short_challenge_description}
                                        fieldname="short_challenge_description"
                                        onChange={(value) => this.handleRTEChange(value, 'short_challenge_description')}
                                    />
                                    <small>Maximum 100 characters</small>
                                </FormGroup>
                            </Col>


                            <Col md="12">
                                <FormGroup>
                                    <label>Type</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.type_text}
                                        fieldname="type_text"
                                        onChange={(value) => this.handleRTEChange(value, 'type_text')}
                                    />
                                    <small>Minimum 5 characters</small>
                                </FormGroup>
                            </Col>


                            <Col md="12">
                                <FormGroup>
                                    <label>First Winner Get</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.winners_get_text}
                                        fieldname="winners_get_text"
                                        onChange={(value) => this.handleRTEChange(value, 'winners_get_text')}
                                    />
                                    <small>Minimum 40 characters</small>
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Second Winner Get</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.winners_get_text2}
                                        fieldname="winners_get_text2"
                                        onChange={(value) => this.handleRTEChange(value, 'winners_get_text2')}
                                    />
                                    <small>Minimum 40 characters</small>
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Third Winner Get</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.winners_get_text3}
                                        fieldname="winners_get_text3"
                                        onChange={(value) => this.handleRTEChange(value, 'winners_get_text3')}
                                    />
                                    <small>Minimum 40 characters</small>
                                </FormGroup>
                            </Col>

                            <br></br>



                            {/* {this.getAllHeadings()} */}
                            <Col md="12">
                                <FormGroup>
                                    <label>You as a PM are responsible for</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.detail_text}
                                        fieldname="detail_text"
                                        onChange={(value) => this.handleRTEChange(value, 'detail_text')}
                                    />
                                    <small>Minimum 10 characters</small>
                                </FormGroup>
                            </Col>

                            <br></br>
                            <Col md="4">
                                <FormGroup>
                                    <label>Points</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        value={this.state.points}
                                        fieldname="points"
                                        placeholder="Number"
                                        min="0"
                                        max="100"
                                        type="number"
                                        onChange={this.handleValueChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <FormGroup>
                                    <label>Evaluation Criteria</label>
                                    <Input
                                        readOnly={this.state.is_readOnly}
                                        modules={this.modules}
                                        value={this.state.evaluation_criteria_text}
                                        fieldname="evaluation_criteria_text"
                                        onChange={(value) => this.handleRTEChange(value, 'evaluation_criteria_text')}
                                    />
                                    <small>Minimum 10 characters</small>
                                </FormGroup>
                            </Col>
                            {this.getAllCategoriesListing()}
                            {!this.state.is_readOnly && <Button disabled={this.state.is_submit_disabled} className="my-4" style={{ margin: "0 auto" }} color="primary" type="submit">
                                Save
                            </Button>}
                        </Row>
                        {/* 
                            <Col md="6">
                                <FormGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-zoom-split-in" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Search" type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <InputGroup className="mb-4">
                                        <Input placeholder="Birthday" type="text" />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="ni ni-zoom-split-in" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        
                        
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <Input
                                        className="is-valid"
                                        placeholder="Success"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-danger">
                                    <Input
                                        className="is-invalid"
                                        placeholder="Error Input"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                        
                     */}
                    </Form>
                </div>}
            </>
        );
    }
}

// export default AddChallenge;
export default withAlert()(AddChallenge)