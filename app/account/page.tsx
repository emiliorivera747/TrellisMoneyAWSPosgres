"use client";
import React from "react";
import { useParams } from "next/navigation";
import useFetchUser from "@/hooks/user/useFetchUser";

const page = () => {
  const params = useParams();
  const { user } = useFetchUser();

  return (
    <div className="p-4 mt-[2%]">
      <h1>{user?.email}</h1>
    </div>
  );
};

export default page;
