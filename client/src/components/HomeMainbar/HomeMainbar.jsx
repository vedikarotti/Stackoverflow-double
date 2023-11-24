import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionsList from "./QuestionsList";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  const user = useSelector((state) => state.currentUserReducer);

  const checkSubscriptionStatus = (questionList, user) => {
    const questionsPostedByUser = questionList.data.filter(
      (question) => question.userId === user.result._id
    );

    const { subscriptionPlan } = user.result;
    const numberOfQuestions = questionsPostedByUser.length;

    const questionsPostedToday = questionsPostedByUser.filter((question) => {
      const today = new Date().toDateString();
      const questionDate = new Date(question.askedOn).toDateString();
      return today === questionDate;
    });

    let status = {
      isValid: false,
      message: "",
      subscriptionPlan: subscriptionPlan,
    };

    switch (subscriptionPlan) {
      case "Gold Plan":
        status.isValid = true;
        break;

      case "Silver Plan":
        if (questionsPostedToday.length < 5) {
          status.isValid = true;
        } else {
          status.isValid = false;
          status.message =
            "User cannot post more than 5 questions per day. Please change your subscription plan.";
        }
        break;

      case "Free Plan":
        if (questionsPostedToday.length === 0 && numberOfQuestions === 0) {
          status.isValid = true;
        } else if (questionsPostedToday.length < 1) {
          status.isValid = true;
        } else {
          status.isValid = false;
          status.message =
            "User cannot post more than 1 question per day. Please change your subscription plan.";
        }
        break;

      default:
        status.isValid = false;
        status.message =
          "User does'nt have any subscription plan. Please go and buy the plan.";
        status.subscriptionPlan = "Unknown Plan";
    }

    return status;
  };

  const checkAuth = async () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      const userStatus = checkSubscriptionStatus(questionsList, user);
      if (!userStatus.isValid) {
        if (userStatus.subscriptionPlan === "Unknown Plan") {
          alert(userStatus.message);
          navigate("/subscription");
        } else {
          alert(userStatus.message);
        }
      } else {
        navigate("/AskQuestion");
      }
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
