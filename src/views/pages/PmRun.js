import {
 getCategories,
 getEnrolmentReport,
 getQuestions,
 getStatistics,
} from "api/ApiRequest";
import Question from "components/Question";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ExportIcon from "../../assets/img/icons/common/export-icon.svg";
import FilterIcon from "../../assets/img/icons/common/filter-icon.svg";
import PlusIcon from "../../assets/img/icons/common/plus-circle.svg";

const PmRun = () => {
 const [activeTab, setActiveTab] = useState("question");
 const [filterOpen, setFilterOpen] = useState(false);
 const [newQuestions, setNewQuestion] = useState([]);
 const changeActiveTab = (e) => {
  setActiveTab(e.target.getAttribute("aria-controls"));
 };
 const [questionList, setQuestionList] = useState([]);
 const [previousQuestionList, setPreviousQuestionList] = useState([]);
 const [categories, setCategories] = useState([]);
 const [filterDate, setFilterDate] = useState([
  {
   startDate: "",
   endDate: "",
   key: "selection",
  },
 ]);
 const [filterData, setFilterData] = useState({});
 const [reportData, setReportData] = useState("");

 const runGetStatistics = () => {
  getStatistics({
   startDate:
    filterDate[0].startDate && format(filterDate[0].startDate, "yyyy-MM-dd"),
   endData:
    filterDate[0].endDate && format(filterDate[0].endDate, "yyyy-MM-dd"),
  })
   .then((response) => response)
   .then((json) => setFilterData(json))
   .catch((error) => console.error(error));
 };

 useEffect(() => {
  getCategories()
   .then((response) => response.data)
   .then((json) => setCategories(json))
   .catch((error) => console.error(error));

  getEnrolmentReport()
   .then((response) => response.data)
   .then((json) => setReportData(json))
   .catch((error) => console.error(error));

  runGetStatistics();
 }, [filterDate]);

 const getAllQuestions = () => {
  getQuestions()
   .then((response) => response.data)
   .then((json) => {
    setQuestionList(json);
   })
   .catch((error) => console.error(error));
  getQuestions()
   .then((response) => response.data)
   .then((json) => {
    setPreviousQuestionList(json);
   })
   .catch((error) => console.error(error));
 };

 useEffect(() => {
  getAllQuestions();
 }, []);

 const addNewQuestion = () => {
  setNewQuestion([
   ...newQuestions,
   {
    question: "",
    questionNo: questionList.length + 1 + newQuestions.length,
    categoryId: "",
    answers: [
     {
      answer: "",
      isCorrectAnswer: false,
     },
     {
      answer: "",
      isCorrectAnswer: false,
     },
     {
      answer: "",
      isCorrectAnswer: false,
     },
     {
      answer: "",
      isCorrectAnswer: false,
     },
    ],
   },
  ]);
 };

 return (
  <>
   <div className="header bg-gradient-info pb-2 pt-2 pt-md-8"></div>
   <div
    className="form-header-div"
    style={{
     padding: "2rem",
    }}>
    <ul className="tabeHead__wrapper nav nav-tabs" id="myTab" role="tablist">
     <li className="nav-item" role="presentation">
      <button
       className={`nav-link bg-transparent ${
        activeTab === "question" && "active"
       }`}
       id="question-tab"
       data-toggle="tab"
       data-target="#question"
       type="button"
       role="tab"
       aria-controls="question"
       aria-selected="true"
       onClick={(e) => changeActiveTab(e)}>
       Question Bank
      </button>
     </li>
     <li className="nav-item" role="presentation">
      <button
       className={`nav-link bg-transparent ${
        activeTab === "users" && "active"
       }`}
       id="users-tab"
       data-toggle="tab"
       data-target="#users"
       type="button"
       role="tab"
       aria-controls="users"
       aria-selected="false"
       onClick={(e) => changeActiveTab(e)}>
       Users
      </button>
     </li>
    </ul>
    <div className="tab-content tabBody__wrapper" id="nav-tabContent">
     <div
      className={`tab-pane fade ${activeTab === "question" && "show active"}`}
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab">
      <div className="row bg-lighter p-4 rounded-lg mt-4 w-100 mx-0">
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "140px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Total number of questions for the Run
        </p>
       </div>
       <div
        className="vr bg-light mr-3"
        style={{
         width: "1px",
        }}></div>
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "140px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Questions for 7 Day Run
        </p>
        <span className="h1 mb-0 lh-100 mt-2 font-weight-700 text-dark">
         28
        </span>
       </div>
       <div
        className="vr bg-light mr-3"
        style={{
         width: "1px",
        }}></div>
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "140px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Questions for 30 Day Run
        </p>
        <span className="h1 mb-0 lh-100 mt-2 font-weight-700 text-dark">
         120
        </span>
       </div>
      </div>
      <h1 className="mt-6 mb-4 text-dark">Questions & Answers</h1>
      <div className="questions__wrapper border-top border-light">
       {questionList?.map((question) => {
        return (
         <Question
          questionText={question.question}
          answers={question.answers}
          questionNo={question.questionNo}
          categoryId={question.categoryId}
          questionAll={question}
          categories={categories}
          previousQuestionList={previousQuestionList}
          getAllQuestions={getAllQuestions}
         />
        );
       })}
       {newQuestions?.map((question) => (
        <Question
         questionText={question.question}
         answers={question.answers}
         questionNo={question.questionNo}
         categoryId={question.categoryId}
         questionAll={question}
         categories={categories}
         newQuestions={newQuestions}
         setNewQuestion={setNewQuestion}
         getAllQuestions={getAllQuestions}
         questionList={questionList}
         questionOpen={true}
        />
       ))}
       <button
        className="add__question d-flex align-items-center border-0 bg-transparent mt-4"
        onClick={() => addNewQuestion()}
        disabled={newQuestions.length > 0}>
        <img
         src={PlusIcon}
         alt=""
         className="mr-2"
         style={{
          width: "20px",
          height: "20px",
         }}
        />
        <span className="font-weight-600">Add Question</span>
       </button>
      </div>
     </div>
     <div
      className={`tab-pane fade ${activeTab === "users" && "show active"}`}
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab">
      <h1 className="mt-5 text-dark">General Statistics</h1>
      <div className="action__buttons d-flex mt-5">
       <div tabIndex="-1" class="dropdown">
        <button
         type="button"
         aria-haspopup="true"
         aria-expanded="true"
         class="nav-link-icon btn rounded-pill d-flex align-items-center px-5"
         style={{
          background: "#5a5a5a",
         }}
         onClick={() => setFilterOpen(!filterOpen)}>
         <img
          className="mr-2"
          style={{
           width: "18px",
           height: "18px",
          }}
          src={FilterIcon}
          alt=""
         />
         <span className="text-white">Filter</span>
        </button>
        <div
         role="menu"
         aria-labelledby="navbar-default_dropdown_1"
         aria-hidden="false"
         class={`dropdown-menu-arrow dropdown-menu p-0 transition  ${
          filterOpen ? "d-flex" : "hide"
         }`}
         x-placement="bottom-start"
         style={{
          position: "absolute",
          willChange: "transform",
          top: "0px",
          left: "0px",
          transform: "translate3d(0px, 43px, 0px)",
         }}>
         <DateRange
          editableDateInputs={true}
          onChange={(item) => {
           setFilterDate([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={filterDate}
          dateDisplayFormat="MMM d, yyyy"
         />
        </div>
       </div>
       <button
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        class="nav-link-icon btn rounded-pill d-flex align-items-center px-5"
        style={{
         background: "#5a5a5a",
        }}
        onClick={() => {
         window.open(filterData.data.toString());
        }}>
        <img
         className="mr-2"
         style={{
          width: "18px",
          height: "18px",
         }}
         src={ExportIcon}
         alt=""
        />
        <span className="text-white">Export</span>
       </button>
      </div>
      <div className="row bg-lighter p-4 rounded-lg mt-4 w-100 mx-0">
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "140px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Total number of users
        </p>
        <span className="h1 mb-0 lh-100 mt-2 font-weight-700 text-dark">
         {filterData.totalnumberofusers}
        </span>
       </div>
       <div
        className="vr bg-light mr-3"
        style={{
         width: "1px",
        }}></div>
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "110px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Users for 7 Day Run
        </p>
        <span className="h1 mb-0 lh-100 mt-2 font-weight-700 text-dark">
         {filterData.usersfor7day}
        </span>
       </div>
       <div
        className="vr bg-light mr-3"
        style={{
         width: "1px",
        }}></div>
       <div
        className="col d-flex flex-column mr-3"
        style={{
         maxWidth: "120px",
        }}>
        <p className="mb-0 text-dark font-weight-500 lh-150">
         Users for 30 Day Run
        </p>
        <span className="h1 mb-0 lh-100 mt-2 font-weight-700 text-dark">
         {filterData.usersfor30day}
        </span>
       </div>
      </div>
      <div
       className="vr bg-light my-5"
       style={{
        height: "1px",
       }}></div>
      <h1 className="text-dark">Enrollment Report</h1>
      <p className="text-dark font-weight-400">
       Export day-wise report of all the enrolled users
      </p>
      <a href={reportData}>
       <button
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        class="nav-link-icon btn rounded-pill d-flex align-items-center px-5 mt-5"
        style={{
         background: "#5a5a5a",
        }}>
        <img
         className="mr-2"
         style={{
          width: "18px",
          height: "18px",
         }}
         src={ExportIcon}
         alt=""
        />
        <span className="text-white">Export</span>
       </button>
      </a>
     </div>
    </div>
   </div>
  </>
 );
};

export default PmRun;
