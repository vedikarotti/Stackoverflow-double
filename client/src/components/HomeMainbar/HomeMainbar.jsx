import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionsList from "./QuestionsList";

const HomeMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  // console.log(questionsList);
  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "what is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongoDB"],
  //     userPosted: "Vedika",
  //     userId: 1,
  //     askedOn: "Sep 11",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Rotti",
  //         answeredOn: "Sep 14",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "what is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "Vedika",
  //     userId: 1,
  //     askedOn: "Sep 11",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Rotti",
  //         answeredOn: "Sep 14",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "what is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["node js", "react js", "mongoDB"],
  //     userPosted: "Vedika",
  //     userId: 1,
  //     askedOn: "Sep 11",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Rotti",
  //         answeredOn: "Sep 14",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Questions
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionsList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
