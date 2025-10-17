import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import SellerSidebar from "./SellerSidebar";

const SellerProfile = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { vendorId, vendorName } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    vendor_id: "",
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    profile_img: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendorId) fetchData();
  }, [vendorId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}vendor/${vendorId}/`);
      const data = response.data;
      setProfileData({
        vendor_id: data.id,
        user_id: data.user.id,
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        username: data.user.username || "",
        email: data.user.email || "",
        mobile: data.mobile || "",
        address: data.address || "",
        profile_img: data.profile_img || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendor profile:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_img" && files && files.length > 0) {
      setProfileData({ ...profileData, profile_img: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation
    const requiredFields = ["first_name", "last_name", "username", "email", "mobile", "address"];
    for (const field of requiredFields) {
      if (!profileData[field]) {
        alert(`Please fill in the ${field.replace("_", " ")} field.`);
        return;
      }
    }

    try {
      // 1️⃣ Update User data
      const userPayload = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        username: profileData.username,
        email: profileData.email,
      };
      await axios.patch(`${baseUrl}user/${profileData.user_id}/`, userPayload);

      // 2️⃣ Update Vendor data
      const formData = new FormData();
      formData.append("mobile", profileData.mobile);
      formData.append("address", profileData.address);
      if (profileData.profile_img instanceof File) {
        formData.append("profile_img", profileData.profile_img);
      }

      await axios.patch(`${baseUrl}vendor/${vendorId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Profile updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("❌ Error updating profile. Check console for details.");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading vendor profile...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>

        {/* Profile Form */}
        <div className="col-md-9 col-12">
          <div className="card shadow-sm">
            <h4 className="card-header bg-primary text-white text-center">
              Seller Profile
            </h4>

            <div className="card-body">
              <h5 className="text-center mb-4 text-uppercase fw-bold">
                Welcome <span className="text-primary">{vendorName}</span>
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={profileData.first_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={profileData.last_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile *</label>
                  <input
                    type="text"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <br />
                  {profileData.profile_img &&
                    !(profileData.profile_img instanceof File) && (
                      <img
                        src={profileData.profile_img}
                        alt="Profile"
                        width="120"
                        className="rounded mb-2 border"
                      />
                    )}
                  <input
                    type="file"
                    name="profile_img"
                    className="form-control"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  💾 Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
