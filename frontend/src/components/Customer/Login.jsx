import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState(false);
  const [msg, setMsg] = useState("");

  // Handle input change
  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("customer_login");
    if (isLoggedIn === "true") {
      navigate("/customer/dashboard");
    }
  }, [navigate]);

  // Save login info & redirect
  const handleLoginSuccess = (username) => {
    localStorage.setItem("customer_login", "true");
    localStorage.setItem("customer_username", username);
    navigate("/customer/dashboard");
  };

  // Submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      username: loginFormData.username,
      password: loginFormData.password,
    };

    axios
      .post(`${baseUrl}/customer/login/`, formData)
      .then((response) => {
        if (response.data.bool === false) {
          setFormError(true);
          setMsg(response.data.msg);
        } else {
          setFormError(false);
          setMsg(response.data.msg);
          handleLoginSuccess(response.data.user); // set login info and redirect
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
    loginFormData.username.trim() !== "" &&
    loginFormData.password.trim() !== "";

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white"
          >
            Login
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={loginFormData.username}
                    onChange={inputHandler}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginFormData.password}
                    onChange={inputHandler}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={!buttonEnable}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className={`text-sm ${formError ? "text-red-500" : "text-green-500"}`}>
                  {msg}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
