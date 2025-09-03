import React from 'react';

const Register = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-md-7 col-lg-6">
                <div className="card shadow-lg border-0 rounded-4">
                    {/* Header */}
                    <div className="card-header bg-success text-white text-center rounded-top-4">
                        <h4 className="mb-0">Create an Account</h4>
                    </div>

                    {/* Body */}
                    <div className="card-body p-4">
                        <form>
                            {/* First Name */}
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label fw-semibold">
                                    <i className="fa fa-user me-2 text-success"></i> First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="firstname"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label fw-semibold">
                                    <i className="fa fa-user me-2 text-success"></i> Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="lastname"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            {/* Username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-semibold">
                                    <i className="fa fa-id-badge me-2 text-primary"></i> Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="username"
                                    placeholder="Choose a username"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    <i className="fa fa-envelope me-2 text-danger"></i> Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    placeholder="Enter your email"
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
                                    placeholder="Create a password"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                    <i className="fa fa-lock me-2 text-warning"></i> Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="confirmPassword"
                                    placeholder="Re-enter your password"
                                />
                            </div>

                            {/* Terms */}
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="terms" />
                                <label className="form-check-label" htmlFor="terms">
                                    I agree to the <a href="#" className="text-decoration-none text-success fw-semibold">Terms & Conditions</a>
                                </label>
                            </div>

                            {/* Submit */}
                            <button type="submit" className="btn btn-success w-100 btn-lg shadow-sm">
                                <i className="fa fa-user-plus me-2"></i> Register
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="card-footer text-center bg-light rounded-bottom-4">
                        <p className="mb-0">
                            Already have an account?{" "}
                            <a href="/login" className="text-success fw-semibold text-decoration-none">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
