import { PrimaryHeader } from "@/components/marketing/headers/Headers";

export default async function AuthErrorPage() {
  return (
    <section className=" h-screen w-screen flex items-center justify-center">
      <div
        style={{
          boxShadow: `rgba(0, 0, 0, 0.15) 0px 3px 3px 0px`,
        }}
        className="flex flex-col items-center  h-[50vh] w-[60%] border rounded-[12px] mx-[5%] px-20"
      >
        <PrimaryHeader label={"Authentication Error"} />
        <p className="py-8 pb-14 text-[#c92a2a] font-light">
          We encountered an issue during the authentication process. Please try
          again or contact support if the issue persists.
        </p>
        <a
          href="/sign-up"
          className="py-4 px-3 rounded-[12px] hover:bg-tertiary-200"
          style={{
            boxShadow: `rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px`,
          }}
        >
          Go Back to Sign Up
        </a>
      </div>
    </section>
  );
}
