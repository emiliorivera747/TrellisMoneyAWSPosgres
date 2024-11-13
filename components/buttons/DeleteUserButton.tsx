"use client";
import React, { useState } from "react";
import userService from "@/lib/features/user/userService";
import authService from "@/lib/features/auth/authService";
import { useRouter } from "next/navigation";

const DeleteUserButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await userService.deleteUser();
      if (res.status === "error") {
        console.log("Error deleting user:", res.message);
        return;
      }
      if (res.status === "success") {
        document.cookie =
          "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        const res = await authService.invalidateLogin();
        console.log(res);
        console.log("User deleted successfully");
        router.push("/"); // Redirect to the home page or login page
      }
    } catch (error: unknown) {
      console.log("Error deleting user:", error);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white font-bold p-4 rounded-md"
      disabled={isLoading}
    >
      {isLoading ? " Delete User..." : "Delete User"}
    </button>
  );
};

export default DeleteUserButton;
