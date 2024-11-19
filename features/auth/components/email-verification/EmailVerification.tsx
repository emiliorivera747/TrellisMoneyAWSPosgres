import React from "react";

const EmailVerification = ({ email }: { email: string }) => {
  const handleResendEmail = () => {
    console.log("Resend email");
  };
  return (
    <div>
      <h2 className="text-3xl text-[#495057] leading-6 tracking-[0.009em] mb-6 text-center font-semibold">
        {" "}
        Verify your email address
      </h2>
      <div className="px-2 pb-8 flex flex-col gap-4 ">
        <p className="text-[#495057]">
          We have sent a verification link to <b>{email}</b>. Please check your
          inbox.
        </p>
      </div>

      <button
        className="w-full px-[.94118rem] py-[1.05882rem] text-white hover:bg-blue-600 bg-blue-500 rounded-[12px] transition duration-300"
        onClick={handleResendEmail}
      >
        Resend Email
      </button>
    </div>
  );
};

export default EmailVerification;
