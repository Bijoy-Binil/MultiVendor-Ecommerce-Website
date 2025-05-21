import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [formError, setFormError] = useState(false);
  const [msg, setMsg] = useState("");
  // Handle input change
  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Submit handler
  const submitHandler = (event) => {
    event.preventDefault()
    const formData = {
      firstName: registerFormData.firstName,
      lastName: registerFormData.lastName,
      userName: registerFormData.userName,
      email: registerFormData.email,
      mobileNumber: registerFormData.mobileNumber,
      password: registerFormData.password,
    };

    axios
      .post(`${baseUrl}/customer/register/`, formData)
      .then((response) => {
        if (response.data.bool === false) {
          setFormError(true);
          setMsg(response.data.msg);
        } else {
          setFormError(false);
          setMsg(response.data.msg);
          
          // Handle successful registration with JWT tokens
          if (response.data.tokens) {
            localStorage.setItem("customer_login", "true");
            localStorage.setItem("customer_id", response.data.customer);
            localStorage.setItem("customer_username", registerFormData.userName);
            localStorage.setItem("access_token", response.data.tokens.access);
            localStorage.setItem("refresh_token", response.data.tokens.refresh);
            
            // Redirect to dashboard after successful registration
            navigate("/customer/dashboard");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setFormError(true);
        setMsg("Something went wrong.");
      });
  };

  // Enable button only if both fields filled
  const buttonEnable =
    registerFormData.firstName.trim() !== "" &&
    registerFormData.lastName.trim() !== "" &&
    registerFormData.userName.trim() !== "" &&
    registerFormData.email.trim() !== "" &&
    registerFormData.mobileNumber.trim() !== "" &&
    registerFormData.password.trim() !== "";

  return (
    <>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Register
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-white"><strong className="text-blue-500">Note: </strong > *All fields are required</p>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6">

                  <div>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      onChange={inputHandler}
                      value={registerFormData.firstName}
                      name="firstName"
                      id="firstName"
                      className="bg-gray-50 border border-gray-300 
                        
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="text"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      onChange={inputHandler}
                      value={registerFormData.lastName}
                      name="lastName"
                      id="LastName"
                      className="bg-gray-50 border border-gray-300 
                        
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="text"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Name
                    </label>

                    <input
                      type="text"
                      onChange={inputHandler}
                      value={registerFormData.userName}
                      name="userName"
                      id="userName"
                      className="bg-gray-50 border border-gray-300 
                        
                        text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>

                    <input
                      type="email"
                      onChange={inputHandler}
                      value={registerFormData.email}
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                        
                        text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="mobileNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your mobileNumber
                    </label>

                    <input
                      type="number"
                      onChange={inputHandler}
                      value={registerFormData.mobileNumber}
                      name="mobileNumber"
                      id="mobileNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                        
                        text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      onChange={inputHandler}
                      value={registerFormData.password}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border 
                        
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  {/* <div>
                        <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div> */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                   
                    onClick={submitHandler}
                    disabled={!buttonEnable}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className={`text-sm ${formError ? "text-red-500" : "text-green-500"}`}>
                  {msg}
                </p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
