import React from "react";
import { NavLink } from "react-router-dom";

const ProfileMenu = () => {
  return (
    <div className="bg-red-50 p-4 rounded-xl shadow-sm mb-6">
      <nav>
        <ul className="flex gap-4 justify-start">
          {/* View Profile */}
          <li>
            <NavLink
              to="/view-profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-red-500 text-white shadow-md"
                    : "text-red-600 hover:bg-red-100"
                }`
              }
            >
              View Profile
            </NavLink>
          </li>

          {/* Update Profile */}
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-red-500 text-white shadow-md"
                    : "text-red-600 hover:bg-red-100"
                }`
              }
            >
              Update Profile
            </NavLink>
          </li>

          {/* Change Password */}
          <li>
            <NavLink
              to="/change-password"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-red-500 text-white shadow-md"
                    : "text-red-600 hover:bg-red-100"
                }`
              }
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
