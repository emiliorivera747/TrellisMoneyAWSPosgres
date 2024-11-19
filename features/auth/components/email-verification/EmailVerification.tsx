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
      <div className="flex flex-col gap-4 text-center mb-10 mt-6 ">
        <p className="text-[#495057] text-[1rem] tracking-wide leading-6">
          We have sent a verification link to <b className="text-primary-800">{email}</b>. Please check your
          inbox.
        </p>
      </div>

      <button
        className="w-full px-[.94118rem] py-[1.05882rem] text-white hover:bg-primary-700 bg-primary-900 rounded-[12px] transition duration-300"
        onClick={handleResendEmail}
      >
        Resend Email
      </button>
    </div>
  );
};

export default EmailVerification;
