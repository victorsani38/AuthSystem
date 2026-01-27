

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/axios";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("view"); // 'view' | 'update' | 'password'
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.pic || null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Fetch user profile from server
  const fetchUser = async () => {
    try {
      const res = await API.get("/users/profile");
      if (res.data.success) {
        const u = res.data.user;
        setFormData({ name: u.name, phone: u.phone, bio: u.bio });
        setPreview(u.pic || null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle profile update (including pic)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("bio", formData.bio);
      if (image) data.append("pic", image);

      const res = await API.put("/users/edit", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setPreview(res.data.user.pic || preview); // update preview from server response
         setUser(res.data.user);
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Unable to update profile");
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/users/edit-password", passwordData);
      if (res.data.success) {
        toast.success("Password updated successfully");
        setPasswordData({ oldPassword: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Menu */}
        <div className="flex gap-4 mb-6 bg-red-50 p-4 rounded-xl shadow-sm">
          {["view", "update", "password"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-red-500 text-white shadow-md"
                  : "text-red-600 hover:bg-red-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "view"
                ? "View Profile"
                : tab === "update"
                ? "Update Profile"
                : "Change Password"}
            </button>
          ))}
        </div>

        {/* VIEW PROFILE */}
        {activeTab === "view" && (
          <div className="rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 backdrop-blur shadow-2xl p-8 md:p-10 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-12">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center md:text-left">
                <div className="relative w-36 h-36">
                  <div className="w-full h-full rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt="profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          setPreview(null);
                        }}
                      />
                    ) : (
                      <FaUserCircle className="text-indigo-500" size={100} />
                    )}
                  </div>

                  {user?.isVerified && (
                    <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      ✔ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="mt-6 md:mt-0 flex-1">
                <h3 className="text-3xl font-bold text-slate-800">{user?.name || "John Doe"}</h3>
                <p className="text-sm text-slate-600 mt-2">{user?.email}</p>
                <p className="text-sm text-slate-600 mt-1">{user?.phone || "N/A"}</p>
                <p className="text-sm text-slate-600 mt-3">{user?.bio || "No bio provided."}</p>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE PROFILE */}
        {activeTab === "update" && (
          <div className="rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 backdrop-blur shadow-2xl p-8 md:p-10 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-12">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center md:text-left">
                <div className="relative w-36 h-36">
                  <div className="w-full h-full rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt="profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          setPreview(null);
                        }}
                      />
                    ) : (
                      <FaUserCircle className="text-indigo-500" size={100} />
                    )}
                  </div>

                  {/* Camera */}
                  <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full shadow hover:bg-indigo-600 cursor-pointer transition">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    <FaCamera size={16} />
                  </label>

                  {user?.isVerified && (
                    <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      ✔ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="mt-8 md:mt-0 flex-1">
                <form className="space-y-5" onSubmit={handleUpdateProfile}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-md"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD */}
        {activeTab === "password" && (
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-xl p-6 md:p-8 border border-slate-200 max-w-md mx-auto">
            <form className="space-y-5" onSubmit={handleChangePassword}>
              {["oldPassword", "password", "confirmPassword"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    {field === "oldPassword"
                      ? "Current Password"
                      : field === "password"
                      ? "New Password"
                      : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    name={field}
                    value={passwordData[field]}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-md"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
