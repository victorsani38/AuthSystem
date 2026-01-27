
import React from "react";

const Footer = () => {
  const currentYear =  new Date().getFullYear();

  return (
    <footer className="w-full mt-10">
      {/* Horizontal line to separate body from footer */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} AUTH:V <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



