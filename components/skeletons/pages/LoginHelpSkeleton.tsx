import React from "react";
import TextInputSkeleton from "@/features/auth/components/skeletons/components/TextInputSkeleton";
import PrimarySubmitButtonSkeleton from "@/features/auth/components/skeletons/components/PrimarySubmitButtonSkeleton";
import PrimaryAuthHeaderSkeleton from "@/features/auth/components/skeletons/components/PrimaryAuthHeaderSkeleton";
import PrimaryAuthContainer from "@/features/auth/components/containers/PrimaryAuthContainer";

const LoginHelpSkeleton = () => {
  return (
    <div className="animate-pulse">
      <nav className="flex justify-between p-4 border-b border-gray-200 mx-10">
        <div className="flex items-center">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen h-auto min-w-screen w-auto">
        <PrimaryAuthContainer>
          <div className="">
            <PrimaryAuthHeaderSkeleton />
            <TextInputSkeleton />
            <PrimarySubmitButtonSkeleton />
          </div>
        </PrimaryAuthContainer>
      </div>
      <footer className="p-4 border-t border-gray-200 mt-auto">
        <div className="h-6 w-full bg-gray-300 rounded"></div>
      </footer>
    </div>
  );
};

export default LoginHelpSkeleton;
