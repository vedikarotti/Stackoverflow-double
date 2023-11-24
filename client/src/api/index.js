import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.BACKEND_ENDPOINT || "https://stackoverflow-rll6.onrender.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (_id) => API.delete(`/questions/delete/${_id}`);
export const voteQuestion = (_id, value, userId) =>
  API.patch(`/questions/vote/${_id}`, { value, userId });

export const postAnswer = (
  _id,
  noOfAnswers,
  answerBody,
  userAnswered,
  userId
) =>
  API.patch(`/answer/post/${_id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (_id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${_id}`, { _id, answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (_id, updateData) =>
  API.patch(`/user/update/${_id}`, updateData);
