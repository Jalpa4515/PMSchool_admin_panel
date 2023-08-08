import { useState } from "react";
import {
 DropdownItem,
 DropdownMenu,
 DropdownToggle,
 UncontrolledDropdown,
} from "reactstrap";
import ArrowDownIcon from "../../assets/img/icons/common/down-arrow.svg";
import EditIcon from "../../assets/img/icons/common/pen-to-square-solid.svg";

const Question = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [category, setCategory] = useState("");
 return (
  <div className="question border-bottom border-light py-3">
   <div className="question__head d-flex align-items-center">
    <span
     className="d-flex justify-content-center align-items-center rounded-circle border text-sm bg-white"
     style={{
      width: "20px",
      height: "20px",
     }}>
     1
    </span>
    <span className="ml-3 font-weight-700 text-dark">Question</span>
    <button
     className="edit__btn ml-auto border-0 p-0 d-flex justify-content-center align-items-center mr-5 bg-transparent"
     style={{
      width: "14px",
      height: "14px",
     }}>
     <img src={EditIcon} alt="" className="w-100 h-100" />
    </button>
    <button
     className="extend__btn border-0 p-0 d-flex justify-content-center align-items-center bg-transparent"
     style={{
      width: "20px",
      height: "20px",
     }}
     onClick={() => setIsOpen(!isOpen)}>
     <img src={ArrowDownIcon} alt="" className="w-100 h-100" />
    </button>
   </div>
   <div className={`question__body ${isOpen ? "d-block" : "d-none"}`}>
    <form action="" className="mt-4 ml-5 pr-5 d-flex flex-column">
     <UncontrolledDropdown nav className="mb-3">
      <DropdownToggle className="nav-link-icon">
       {category || "Select Category"}
      </DropdownToggle>
      <DropdownMenu
       aria-labelledby="navbar-default_dropdown_1"
       className="dropdown-menu-arrow"
       left>
       <DropdownItem onClick={(e) => setCategory(e.target.innerText)}>
        User Research
       </DropdownItem>
       <DropdownItem onClick={(e) => setCategory(e.target.innerText)}>
        User Research
       </DropdownItem>
       <DropdownItem divider />
       <DropdownItem onClick={(e) => setCategory(e.target.innerText)}>
        User Research
       </DropdownItem>
       <DropdownItem divider />
       <DropdownItem onClick={(e) => setCategory(e.target.innerText)}>
        User Research
       </DropdownItem>
      </DropdownMenu>
     </UncontrolledDropdown>
     <div className="question__text d-flex flex-column">
      <label htmlFor="addQuestion">Add question</label>
      <textarea
       name=""
       id="addQuestion"
       rows="6"
       className="rounded-sm p-2"></textarea>
     </div>
     <div className="question__ans d-flex mt-3">
      <div className="questionAns__text d-flex flex-column flex-grow-1 mr-4">
       <label htmlFor="questionAns1">Add answer option 1</label>
       <textarea
        name=""
        id="questionAns1"
        rows="3"
        className="rounded-sm border border-light p-3"
        style={{
         resize: "none",
        }}></textarea>
      </div>
      <div className="questionAns__rightOption d-flex flex-column align-items-baseline">
       <label htmlFor="questionAnsRightOption1">Right option</label>
       <input
        type="checkbox"
        name=""
        id="questionAnsRightOption1"
        className=""
        style={{
         width: "20px",
         height: "20px",
         cursor: "pointer",
        }}
       />
      </div>
     </div>
     <div className="question__ans d-flex mt-3">
      <div className="questionAns__text d-flex flex-column flex-grow-1 mr-4">
       <label htmlFor="questionAns1">Add answer option 1</label>
       <textarea
        name=""
        id="questionAns1"
        rows="3"
        className="rounded-sm border border-light p-3"
        style={{
         resize: "none",
        }}></textarea>
      </div>
      <div className="questionAns__rightOption d-flex flex-column align-items-baseline">
       <label htmlFor="questionAnsRightOption1">Right option</label>
       <input
        type="checkbox"
        name=""
        id="questionAnsRightOption1"
        className=""
        style={{
         width: "20px",
         height: "20px",
         cursor: "pointer",
        }}
       />
      </div>
     </div>
     <div className="question__ans d-flex mt-3">
      <div className="questionAns__text d-flex flex-column flex-grow-1 mr-4">
       <label htmlFor="questionAns1">Add answer option 1</label>
       <textarea
        name=""
        id="questionAns1"
        rows="3"
        className="rounded-sm border border-light p-3"
        style={{
         resize: "none",
        }}></textarea>
      </div>
      <div className="questionAns__rightOption d-flex flex-column align-items-baseline">
       <label htmlFor="questionAnsRightOption1">Right option</label>
       <input
        type="checkbox"
        name=""
        id="questionAnsRightOption1"
        className=""
        style={{
         width: "20px",
         height: "20px",
         cursor: "pointer",
        }}
       />
      </div>
     </div>
     <div className="question__ans d-flex mt-3">
      <div className="questionAns__text d-flex flex-column flex-grow-1 mr-4">
       <label htmlFor="questionAns1">Add answer option 1</label>
       <textarea
        name=""
        id="questionAns1"
        rows="3"
        className="rounded-sm border border-light p-3"
        style={{
         resize: "none",
        }}></textarea>
      </div>
      <div className="questionAns__rightOption d-flex flex-column align-items-baseline">
       <label htmlFor="questionAnsRightOption1">Right option</label>
       <input
        type="checkbox"
        name=""
        id="questionAnsRightOption1"
        className=""
        style={{
         width: "20px",
         height: "20px",
         cursor: "pointer",
        }}
       />
      </div>
     </div>
     <div className="action__buttons mt-5 ml-auto">
      <button className="border-0 px-5 py-2 rounded-pill bg-dark text-white mr-3">
       Save
      </button>
      <button className="px-5 py-2 rounded-pill bg-white text-dark border border-light">
       Cancel
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default Question;
