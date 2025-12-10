
/**
 * Footer component that renders a footer section for the application.
 * 
 * This component displays the current year, company name, and links to the 
 * Privacy Policy and Terms of Service pages. It is styled using Tailwind CSS 
 * classes for layout, typography, and spacing.
 * 
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className=" text-tertiary-800  border-tertiary-100 bottom-0 left-0 right-0 text-xs border-t py-10 flex items-center justify-center">
      <div className="h-full text-center items-center  w-full">
        <p className="text-xs text-tertiary-700">
          &copy; {new Date().getFullYear()} Trellis Money. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-tertiary-700">
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="hover:text-gray-400 ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
