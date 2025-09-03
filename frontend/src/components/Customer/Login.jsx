import React from 'react';

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-primary text-white text-center rounded-top-4">
            <h4 className="mb-0">Login</h4>
          </div>
          <div className="card-body p-4">
            <form>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  <i className="fa fa-user me-2 text-primary"></i> Username
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  <i className="fa fa-lock me-2 text-warning"></i> Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember + Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100 btn-lg shadow-sm">
                <i className="fa fa-sign-in-alt me-2"></i> Login
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="card-footer text-center bg-light rounded-bottom-4">
            <p className="mb-0">
              Don’t have an account?{" "}
              <a href="/register" className="text-primary fw-semibold text-decoration-none">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
