import React from "react";

//Components
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";

//Icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

const passwordCriteria = [
  { regex: /.{8,}/, label: "At least 8 characters long" },
  { regex: /[0-9]/, label: "At least 1 number" },
  { regex: /[a-z]/, label: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, label: "At least 1 uppercase letter" },
  { regex: /[^A-Za-z0-9]/, label: "At least 1 special character" },
];

const PasswordTooltip = ({ password }: { password: string }) => {
  return (
    <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-1 w-full p-4">
      <div className="text-sm mb-2 text-[#343a40] font-semibold">
        Your password must have:
      </div>
      {passwordCriteria.map((criteria, index) => {
        const isValid = criteria.regex.test(password);
        return (
          <div key={index} className="flex items-center mb-1 text-[0.8rem]">
            {isValid ? (
              <IoIosCheckmarkCircle className="text-green-700 mr-2" />
            ) : (
              <IoIosCloseCircle className="text-[#adb5bd] mr-2" />
            )}
            <span className={isValid ? "text-green-700" : "text-[#adb5bd]"}>
              {criteria.label}
            </span>
          </div>
        );
      })}
      <PasswordStrengthChecker password={password} />
    </div>
  );
};

export default PasswordTooltip;
