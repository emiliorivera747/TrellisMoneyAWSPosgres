"use client";
import React from "react";
import PrivateRoute from "@/features/auth/components/private-route/PrivateRoute";

const InvestmentGoals = () => {
  return (
    <PrivateRoute>
      <div>Investment goals</div>
    </PrivateRoute>
  );
};

export default InvestmentGoals;
