import React, { useState } from "react";
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

  const users = useSelector((state) => state.usersReducer);
  // console.log(users);
  const currentProfile = users.filter((user) => user._id === _id)[0];
  // console.log(currentProfile);
  const currentUser = useSelector((state) => state.currentUserReducer);
  //sole.log(currentUser);

  const [Switch, setSwitch] = useState(false);

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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
