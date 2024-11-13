

//React
import React from "react";
// import { useState, useEffect } from "react";

//Components
import SignOutButton from "@/components/buttons/SignOutButton";

//Auth Context
import getUser from "@/lib/getUser";


const Dashboard = async () => {
  const user = await getUser();
  const formattedString = JSON.stringify(user, null, "\t");

  return (
    <div className="">
      {user && (
        <div>
          {/* <p>Email: {user ? user?.email : "no name"}</p>
            <p>UID: {user ? user?.uid : "no name"}</p>
            <p>USER EXISTS: {userEx ? "True" : "False"}</p> */}
          <pre className="text-sm text-black font-mono">
            <code>{formattedString}</code>
          </pre>
        </div>
      )}
      <SignOutButton />
    </div>
  );
};

export default Dashboard;
