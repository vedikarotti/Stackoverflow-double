import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";

const UserProfile = () => {
  const { _id } = useParams();
  const [plan, setPlan] = useState("free");
  const [maxQuestions, setMaxQuestions] = useState(1);
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);

  const users = useSelector((state) => state.usersReducer);
  // console.log(users);
  const currentProfile = users.filter((user) => user._id === _id)[0];
  // console.log(currentProfile);
  const currentUser = useSelector((state) => state.currentUserReducer);
  //sole.log(currentUser);
  const isCurrentUser = currentUser?.result._id === _id;

  const [Switch, setSwitch] = useState(false);

  useEffect(() => {
    console.log(`Max questions allowed: ${maxQuestions}`);
    console.log(`Subscription price: ₹${subscriptionPrice}/month`);
  }, [maxQuestions, subscriptionPrice]);

  const handleSubscription = (planType) => {
    if (planType === "silver") {
      setMaxQuestions(10); // Update the state using a function
      setSubscriptionPrice(100); // ₹100/month for Silver Plan
    } else if (planType === "gold") {
      setMaxQuestions((prevMaxQuestions) => -1); // Update the state using a function
      setSubscriptionPrice((prevSubscriptionPrice) => 1000); // ₹1000/month for Gold Plan
    }

    // Perform logic based on the subscription plan selected
    // For instance, you can make API calls to the payment gateway here

    // Example console logs for demonstration purposes
  };

  return (
    <div>
      <div className="home-container-1">
        <LeftSidebar />
        <div className="home-container-2">
          <section>
            <div className="user-details-container">
              <div className="user-details">
                <Avatar
                  backgroundColor="purple"
                  color="white"
                  fontSize="50px"
                  px="40px"
                  py="50px"
                >
                  {currentProfile?.name.charAt(0).toUpperCase()}
                </Avatar>
                <div className="user-name">
                  <h1> {currentProfile?.name} </h1>
                  <p>
                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                    {moment(currentProfile?.joinedOn).fromNow()}
                  </p>
                </div>
              </div>
              {currentUser?.result._id === _id && (
                <button
                  type="button"
                  onClick={() => setSwitch(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
              )}
            </div>
            <>
              {Switch ? (
                <EditProfileForm
                  currentUser={currentUser}
                  setSwitch={setSwitch}
                />
              ) : (
                <ProfileBio currentProfile={currentProfile} />
              )}
            </>
          </section>
          {isCurrentUser && (
            <section className="subscription-plans">
              <h1>Subscription Plans {plan}</h1>
              <div>
                <button
                  onClick={() => {
                    setPlan("free");
                    handleSubscription("free");
                  }}
                >
                  Subscribe to Free Plan
                </button>
                <button
                  onClick={() => {
                    setPlan("sliver");
                    handleSubscription("sliver");
                  }}
                >
                  Subscribe to Silver Plan (₹100/month)
                </button>
                <button
                  onClick={() => {
                    setPlan("gold");
                    handleSubscription("gold");
                  }}
                >
                  Subscribe to Gold Plan (₹1000/month)
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
