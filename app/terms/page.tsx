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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Trellis Money! These terms and conditions outline the rules
        and regulations for the use of our application.
      </p>
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing or using our application, you agree to be bound by these
        terms. If you do not agree with any part of the terms, you must not use
        the application.
      </p>
      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Any changes will
        be effective immediately upon posting. It is your responsibility to
        review the terms periodically.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about these terms, please contact us at
        support@trellismoney.com.
      </p>
    </div>
  );
};

export default TermsPage;
