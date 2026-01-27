// import { useEffect, useRef, useState } from "react"
// import { BiLogIn } from "react-icons/bi"
// import { Link, useNavigate } from "react-router-dom"
// import { FaUserCircle } from "react-icons/fa"
// import { useAuth } from "../../context/AuthContext"

// const Header = ({ isHome, isDashboard }) => {
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)
//   const [openProfile, setOpenProfile] = useState(false)
//   const { user, logout } = useAuth()

//   // ✅ Initials for verified users
//   const initials = user?.isVerified
//     ? user.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
//     : null

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenProfile(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   return (
//     <header className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-md">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* Logo */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <BiLogIn size={35} className="text-blue-400" />
//           <span className="text-2xl font-bold tracking-wider">
//             AUTH<span className="text-blue-300">:VIC</span>
//           </span>
//         </div>

//         {/* Right side */}
//         <div className="flex items-center gap-4">

//           {/* HOME → Login button */}
//           {isHome && !user && (
//             <Link
//               to="/login"
//               className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Login
//             </Link>
//           )}

//           {/* DASHBOARD → Profile */}
//           {isDashboard && user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setOpenProfile(!openProfile)}
//                 className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-800 transition"
//               >
//                 {/* Profile Avatar */}
//                 {user.pic && user.pic !== "my-Pics" ? (
//                   <img
//                     src={user.pic}
//                     alt="profile"
//                     className="w-9 h-9 rounded-full object-cover border-2 border-white"
//                   />
//                 ) : (
//                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
//                     <FaUserCircle size={20} />
//                   </div>
//                 )}

//                 {/* Hi, Name */}
//                 <span className="text-sm font-medium whitespace-nowrap">
//                   Hi, {user.name}
//                 </span>

//                 {/* Verified badge */}
//                 {user.isVerified && initials && (
//                   <div className="bg-green-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold">
//                     {initials}
//                   </div>
//                 )}
//               </button>

//               {/* Dropdown */}
//               <div
//                 className={`absolute right-0 mt-3 w-56 rounded-xl shadow-xl border border-white/20
//                             bg-gradient-to-b from-indigo-700 via-blue-800 to-purple-800 text-white
//                             transform transition-all duration-200 origin-top-right 
//                             ${openProfile ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
//               >
//                 <div className="px-4 py-3 border-b border-white/30">
//                   <p className="text-sm text-white/70">Signed in as</p>
//                   <p className="font-semibold">{user.name}</p>
//                 </div>

//                 <ul className="py-2 text-sm">
//                   <li
//                     onClick={() => navigate("/profile")}
//                     className="px-4 py-2 hover:bg-white/10 cursor-pointer rounded-md transition"
//                   >
//                     Profile
//                   </li>
//                   <li
//                     onClick={() => navigate("/settings")}
//                     className="px-4 py-2 hover:bg-white/10 cursor-pointer rounded-md transition"
//                   >
//                     Settings
//                   </li>
//                   <li
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer rounded-md transition"
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   )
// }

// export default Header

import { useEffect, useRef, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header = ({ isHome, isDashboard }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);
  const { user, logout } = useAuth();

  // Initials for verified users
  const initials = user?.isVerified
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : null;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-slate-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <BiLogIn size={35} className="text-purple-500" />
          <span className="text-2xl font-bold tracking-wider text-pink-600">
            AUTH<span className="text-yellow-500">:VIC</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* HOME → Login button */}
          {isHome && !user && (
            <Link
              to="/login"
              className="bg-pink-400 hover:bg-pink-500 px-4 py-2 rounded-md text-sm font-medium transition text-white"
            >
              Login
            </Link>
          )}

          {/* DASHBOARD → Profile */}
          {isDashboard && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-pink-200 transition"
              >
                {/* Profile Avatar */}
                {user.pic && user.pic !== "my-Pics" ? (
                  <img
                    src={user.pic}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 flex items-center justify-center text-indigo-500 text-sm font-semibold">
                    <FaUserCircle size={20} />
                  </div>
                )}

                {/* Hi, Name */}
                <span className="text-sm font-medium whitespace-nowrap">
                  Hi, {user.name}
                </span>

                {/* Verified badge */}
                {user.isVerified && initials && (
                  <div className="bg-green-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold">
                    {initials}
                  </div>
                )}
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-56 rounded-xl shadow-xl border border-white/20
                            bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-slate-800
                            transform transition-all duration-200 origin-top-right 
                            ${openProfile ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <div className="px-4 py-3 border-b border-white/30">
                  <p className="text-sm text-slate-600">Signed in as</p>
                  <p className="font-semibold">{user.name}</p>
                </div>

                <ul className="py-2 text-sm">
                  <li
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-pink-200 cursor-pointer rounded-md transition"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => navigate("/settings")}
                    className="px-4 py-2 hover:bg-pink-200 cursor-pointer rounded-md transition"
                  >
                    Settings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer rounded-md transition"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;



