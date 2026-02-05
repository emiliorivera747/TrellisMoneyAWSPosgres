"use client";

// React
import React from "react";

// Hooks
import useFetchUser from "@/hooks/user/useFetchUser";

const page = () => {
  const { user } = useFetchUser();

  return (
    <div className="p-4 mt-[2%]">
      <h1>{user?.email}</h1>
    </div>
  );
};

export default page;
