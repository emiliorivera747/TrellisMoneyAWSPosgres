import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-tertiary-600 py-8  mx-16 border-tertiary-300 bottom-0 left-0 right-0text-xs">
      <div className="container h-full text-center">
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
