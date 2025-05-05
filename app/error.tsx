"use client";

import { useEffect } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div
        
        className="flex flex-col justify-start items-center  mx-[10%]  mt-[10%] h-1/2  rounded-[12px] bg-white p-16 "
      >
        <div className="my-4 flex flex-col items-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-tertiary-800">
            Oops! Something went wrong
          </h1>
          <h2 className="text-md text-tertiary-700 ml-1 ">
            <span className="font-medium text-tertiary-800">
              Error details:{" "}
            </span>
            <span className="">
            {error.message}
            </span>
          </h2>
        </div>
        <PrimaryButton
          actionFunction={() => reset()}
          text={"Try again"}
          w={"w-[18rem]"}
        />
      </div>
    </div>
  );
}
