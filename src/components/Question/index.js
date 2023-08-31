import { addQuestion, getQuestions, updateQuestion } from "api/ApiRequest";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
 DropdownItem,
 DropdownMenu,
 DropdownToggle,
 UncontrolledDropdown,
} from "reactstrap";
import ArrowDownIcon from "../../assets/img/icons/common/down-arrow.svg";
import EditIcon from "../../assets/img/icons/common/pen-to-square-solid.svg";

const Question = ({
 questionText,
 answers,
 questionNo,
 categoryId,
 questionAll,
 categories,
 setNewQuestion,
 getAllQuestions,
 questionList,
 newQuestions,
 questionOpen,
 previousQuestionList,
}) => {
 const [isOpen, setIsOpen] = useState(questionOpen || false);
 const [question, setQuestion] = useState({
  questionNo,
  questionText,
  answers,
  categoryId: "",
  _id: questionAll._id,
 });
 const [defaultAnswers, setDefaultAnswers] = useState();
 const alert = useAlert();

 useEffect(() => {
  getQuestions()
   .then((response) => response.data)
   .then((json) => {
    json.forEach((item) => {
     item._id === question._id && setDefaultAnswers(item.answers);
    });
   })
   .catch((error) => console.error(error));
 }, []);

 console.log(defaultAnswers);

 const saveChanges = (e) => {
  e.preventDefault();
  let isChecked = false;
  let isAnsFilled = true;
  question.answers.forEach((answer) => {
   if (answer.isCorrectAnswer === true) {
    isChecked = true;
   }
  });
  for (let i = 0; i < question.answers.length; i++) {
   if (
    question.answers[i].answer === "" ||
    question.answers[i].answer === undefined
   ) {
    isAnsFilled = false;
    break;
   }
  }
  if (isAnsFilled && question.questionText) {
   if (isChecked) {
    if (question.categoryId) {
     if (setNewQuestion) {
      addQuestion({
       question: question.questionText,
       questionNo: questionList.length + 1,
       categoryId: question.categoryId,
       answers: answers,
      })
       .then(() => {
        alert.success(`Question ${question.questionNo} added`);
       })
       .catch((error) => console.error(error));
     } else {
      updateQuestion({
       ...questionAll,
       answers: question.answers,
       categoryId: question.categoryId,
       question: question.questionText,
       questionNo: question.questionNo,
      })
       .then(() => {
        alert.success(`Question ${question.questionNo} updated`);
       })
       .catch((error) => console.error(error));
     }
    } else {
     alert.error(`Please, select a category`);
    }
   } else {
    alert.error(`Please, check at least one right answer`);
   }
  } else {
   alert.error(`Please, fill all the inputs`);
  }
 };

 const cancelChanges = (e) => {
  e.preventDefault();
  if (setNewQuestion) {
   const updatedNewQuestions = newQuestions.filter(
    (newQuestion) => newQuestion.questionNo !== question.questionNo
   );
   updatedNewQuestions.forEach((newQuestion, index) => {
    newQuestion.questionNo = questionList.length + 1;
   });
   setNewQuestion(updatedNewQuestions);
   alert.success(`Question ${question.questionNo} removed`);
  } else {
   setQuestion({
    questionNo,
    questionText,
    answers: defaultAnswers,
    categoryId,
   });
   alert.success(`Question ${question.questionNo} changes has been canceled`);
  }
 };

 return (
  <div className="question border-bottom border-light py-3">
   <div className="question__head d-flex align-items-center">
    <span
     className="d-flex justify-content-center align-items-center rounded-circle border text-sm bg-white"
     style={{
      width: "20px",
      height: "20px",
     }}>
     {question.questionNo}
    </span>
    <span className="ml-3 font-weight-700 text-dark">Question</span>
    <button
     className="edit__btn ml-auto border-0 p-0 d-flex justify-content-center align-items-center mr-5 bg-transparent"
     style={{
      width: "14px",
      height: "14px",
     }}
     onClick={() => setIsOpen(true)}>
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
       {question?.categoryId?.category || "Select Category"}
      </DropdownToggle>
      <DropdownMenu
       aria-labelledby="navbar-default_dropdown_1"
       className="dropdown-menu-arrow"
       left>
       {categories.map((category) => (
        <DropdownItem
         onClick={(e) => {
          setQuestion({
           ...question,
           categoryId: category,
          });
         }}>
         {category.category}
        </DropdownItem>
       ))}
      </DropdownMenu>
     </UncontrolledDropdown>
     <div className="question__text d-flex flex-column">
      <label htmlFor="addQuestion">Add question</label>
      <textarea
       name=""
       id="addQuestion"
       rows="6"
       className="rounded-sm p-2"
       value={question.questionText}
       onChange={(e) => {
        setQuestion({
         ...question,
         questionText: e.target.value,
        });
       }}
       required></textarea>
     </div>
     {question.answers?.map((answer, index) => (
      <div className="question__ans d-flex mt-3">
       <div className="questionAns__text d-flex flex-column flex-grow-1 mr-4">
        <label htmlFor="questionAns1">Add answer option {index + 1}</label>
        <textarea
         name=""
         id="questionAns1"
         rows="3"
         className="rounded-sm border border-light p-3"
         style={{
          resize: "none",
         }}
         value={answer.answer}
         onChange={(e) => {
          let updatedAns = question.answers;
          updatedAns[index].answer = e.target.value;
          setQuestion({
           ...question,
           answers: updatedAns,
          });
         }}
         required></textarea>
       </div>
       <div className="questionAns__rightOption d-flex flex-column align-items-baseline">
        <label htmlFor="questionAnsRightOption1">Right option</label>
        <input
         type="checkbox"
         name=""
         id={`questionAnsRightOption${index}`}
         className=""
         defaultChecked={answer.isCorrectAnswer}
         onChange={(e) => {
          let updatedAns = question.answers;
          updatedAns[index].isCorrectAnswer = e.target.checked;
          setQuestion({
           ...question,
           answers: updatedAns,
          });
         }}
         style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
         }}
        />
       </div>
      </div>
     ))}
     <div className="action__buttons mt-5 ml-auto">
      <button
       className="border-0 px-5 py-2 rounded-pill bg-dark text-white mr-3"
       onClick={(e) => saveChanges(e)}
       type="submit">
       Save
      </button>
      <button
       className="px-5 py-2 rounded-pill bg-white text-dark border border-light"
       onClick={(e) => cancelChanges(e)}>
       Cancel
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default Question;
