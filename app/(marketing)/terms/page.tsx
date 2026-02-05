// React
import React from "react";

/**
 * TermsPage Component
 *
 * This React functional component renders the "Terms and Conditions" page
 * for the Trellis Money application. It provides information about the
 * application's terms of use, including acceptance of terms, changes to terms,
 * and contact information.
 *
 * @component
 *
 * @returns {JSX.Element} A styled div containing the terms and conditions content.
 *
 * @remarks
 * - The component uses inline styles for basic padding and font styling.
 * - It includes sections for "Acceptance of Terms," "Changes to Terms," and "Contact Us."
 *
 * @example
 * ```tsx
 * import TermsPage from './terms/page';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <TermsPage />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
const TermsPage: React.FC = () => {
  return (
    <div className="p-10 pl-14 font-sans font-bold text-tertiary-900">
      <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>
      <p className="mb-6 font-light text-tertiary-800">
        Welcome to Trellis Money! These terms and conditions outline the rules
        and regulations for the use of our application.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Acceptance of Terms
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        By accessing or using our application, you agree to be bound by these
        terms. If you do not agree with any part of the terms, you must not use
        the application.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Changes to Terms
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        We reserve the right to modify these terms at any time. Any changes will
        be effective immediately upon posting. It is your responsibility to
        review the terms periodically.
      </p>
      <h2 className="text-xl font-semibold mb-2 text-tertiary-1000">
        Contact Us
      </h2>
      <p className="mb-6 font-light text-tertiary-800">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:support@trellismoney.com"
          className="text-blue-500 underline"
        >
          support@trellismoney.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsPage;
