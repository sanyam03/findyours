import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";

const UserAvatar = ({ user }) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (user) {
      console.log("user: ", user) // this is returning user's email and token
      console.log("user name: ", user.name) // this is undefined

      // with the above comment, this cannot retrieve first/last name from an 'undefined' field
      // also, the current user model only request name from user, no first or last name is defined
      // this explains why the click on the menu in 'NavBar' returns an error
      // please correct this based on the user model we have or update backend to include details
      setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
    }
  }, [user]);

  return (
    <Avatar
      alt={`${user.first_name} ${user.last_name}`}
      src={user.profilePicUrl ? user.profilePicUrl : ""}
    >
      {user.profilePicUrl ? null : initials}
    </Avatar>
  );
};

export default UserAvatar;
