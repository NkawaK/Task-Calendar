import React, { useContext } from "react";

import { FirebaseContext } from "../Firebase";
import { signOut } from "../FirebaseAuth"

const UserNav: React.FC = () => {
  const { userName } = useContext(FirebaseContext);

  if (userName !== "") {
    return (
      <span className="header_username">
        {userName} | 
        <span className="header_signout" onClick={signOut}>SignOut</span>
      </span>
    );
  } else {
    return null;
  }
};

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header_title">
        TaskCalendar
        <UserNav/>
      </div>
    </div>
  );
};

export default Header;