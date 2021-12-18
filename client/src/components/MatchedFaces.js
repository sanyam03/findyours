import React, { useState, useEffect } from "react";


const MatchedFaces = ({ user }) => {
  const [initials, setInitials] = useState("");
    console.log("In matched")
  useEffect(() => {
      debugger;
    if (user) {
      setInitials(`${user.first_name[0]} ${user.last_name[0]}`);
    }
  }, [user]);

  return (
    <>
    <h1>hey there</h1>
    </>
  );
};

export default MatchedFaces;
