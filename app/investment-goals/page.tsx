"use client";
import React from "react";
import PrivateRoute from "@/components/private-route/PrivateRoute";

const InvestmentGoals = () => {
  return (
    <PrivateRoute>
      <div>Investment goals</div>
    </PrivateRoute>
  );
};

export default InvestmentGoals;
