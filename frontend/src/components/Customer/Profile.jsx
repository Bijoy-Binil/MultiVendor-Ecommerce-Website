import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

const Profile = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const { customerId, customerName } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    p_img: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}customer/${customerId}/`);
      const customer = response.data;
      console.log("Response==>", customer);
      setProfileData({
        user_id: customer.user.id,
        first_name: customer.user.first_name || "",
        last_name: customer.user.last_name || "",
        username: customer.user.username || "",
        email: customer.user.email || "",
        mobile: customer.mobile || "",
        p_img: customer.profile_img || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "p_img" && files && files.length > 0) {
      setProfileData({ ...profileData, p_img: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userId = profileData.user_id;
    if (!userId) {
      alert("User id missing. Please reload or re-login.");
      return;
    }

    // 1) Update user fields with JSON using PATCH (partial update)
    try {
      const userPayload = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        username: profileData.username,
        email: profileData.email,
      };

      const userResp = await axios.patch(`${baseUrl}user/${userId}/`, userPayload);
      console.log("User updated:", userResp.data);
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err);
      // show validation messages from DRF if any
      alert("Failed to update user. See console for details.");
      return; // stop further actions until user update is fixed
    }

    // 2) Update customer (mobile & profile image) using FormData
    try {
      const formData = new FormData();
      formData.append("user", userId); // if serializer expects user id
      formData.append("mobile", profileData.mobile || "");
      // backend field name is profile_img (not profile_image)
      if (profileData.p_img instanceof File) {
        formData.append("profile_img", profileData.p_img);
      }
      // If no new file, you may skip appending profile_img so server won't change it.

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const custResp = await axios.patch(`${baseUrl}customer/${customerId}/`, formData, config);
      console.log("Customer updated:", custResp.data);
      alert("Profile updated successfully!");
      // optionally refresh data
      fetchData();
    } catch (err) {
      console.error("Error updating customer:", err.response?.data || err);
      alert("Failed to update customer. See console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Update Profile</h4>
            <h4 className="text-center text-uppercase fw-bold my-3">
              Welcome <span className="text-primary">{customerName}</span>
            </h4>
            <hr className="mb-4" />

            <div className="card-body">
              <form onSubmit={submitHandler}>
                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleChange}
                    className="form-control"
                    id="first_name"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleChange}
                    className="form-control"
                    id="last_name"
                  />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="form-control"
                    id="username"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                  />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleChange}
                    className="form-control"
                    id="mobile"
                  />
                </div>

                {/* Profile Picture */}
                <div className="mb-3">
                  {profileData.p_img && !(profileData.p_img instanceof File) && (
                    <img src={profileData.p_img} alt="Profile" width="100" className="mt-2 d-block" />
                  )}
                  <label htmlFor="p_img" className="form-label">
                    Choose a profile picture:
                  </label>
                  <input
                    className="form-control mt-2"
                    type="file"
                    id="p_img"
                    name="p_img"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
