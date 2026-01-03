/**
 * PrivacyPage Component
 *
 * This component renders the Privacy Policy page for the application.
 * It provides information about how user data is collected, used, and protected.
 *
 * @component
 * @returns {JSX.Element} The rendered Privacy Policy page.
 *
 * @remarks
 * - The page includes sections for information collection, usage, sharing, user rights, and contact details.
 * - Inline styles are used for basic styling.
 *
 * @example
 * <PrivacyPage />
 *
 * @see {@link https://www.example.com/privacy-policy} for more details on the privacy policy.
 */
const PrivacyPage = () => {
  return (
    <div className="p-10 pl-14 font-sans font-bold text-tertiary-900">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <p className="mb-6 font-light text-tertiary-800">
        Your privacy is important to us. This privacy policy explains how we
        collect, use, and protect your information.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Information We Collect
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        We may collect personal information such as your name, email address,
        and other details when you use our services.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        How We Use Your Information
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        We use your information to provide and improve our services, communicate
        with you, and ensure the security of our platform.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Sharing Your Information
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        We do not share your personal information with third parties except as
        required by law or to provide our services.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Your Rights
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        You have the right to access, update, or delete your personal
        information. Contact us if you have any concerns.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Contact Us
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        If you have any questions about this privacy policy, please contact us
        at{" "}
        <a
          href="mailto:privacy@trellismoney.com"
          className="text-blue-500 underline"
        >
          privacy@trellismoney.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPage;
