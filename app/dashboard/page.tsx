

//React
// import { useState, useEffect } from "react";

//Components
import SignOutButton from "@/components/buttons/SignOutButton";
// import PrivateRoute from "@/components/private-route/PrivateRoute";

//Auth Context
// import { useAuth } from "@/app/AuthContext";

import getUser from "@/lib/getUser";

// import { fetchWithFirebaseHeaders } from "@/lib/fetchWithFireBaseHeaders";

// import userService from "@/lib/features/user/userService";

interface ProtectedData {
  message: string;
  userId: string;
}

const Dashboard = async () => {
  const user = await getUser();
  const formattedString = JSON.stringify(user, null, "\t");

  // const { user } = useAuth();
  // const [data, setData] = useState<ProtectedData | null>(null);
  // const [userEx, setUserEx] = useState<boolean>(false);

  // async function fetchData() {
  //   try {
  //     const response = await fetchWithFirebaseHeaders("/api/users");
  //     const result = await response.json();
  //     if (response.ok) {
  //       setData(result);
  //     } else {
  //       console.log(result.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const buttonClick = () => {
  //   console.log("Button Clicked");
  //   fetchData();
  // };

  return (
    // <PrivateRoute>
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
    // </PrivateRoute>
  );
};

export default Dashboard;
