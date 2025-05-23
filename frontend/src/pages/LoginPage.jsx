import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../stores/authStore/authThunks";

const LoginPage = () => {
  const dispatch = useDispatch();

  const { isLogging } = useSelector((state) => state?.auth || {});

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => dispatch(loginUser({ userCredentials: values })),
  });

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center bg-light"
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      {/* Top nav */}
      <div className="w-100 d-flex justify-content-end mb-3">
        <span>
          Don’t have an account?
          <NavLink to={"/register"}>Register</NavLink>
        </span>
      </div>

      {/* Login Card */}
      <div
        className="card shadow w-100"
        style={{ maxWidth: "400px", overflow: "hidden" }}
      >
        <div className="card-body p-4">
          <h2 className="text-center mb-4">
            Welcome back to <span style={{ color: "#6A4573" }}>ChatHive</span>
          </h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#C8A2C8", color: "#fff" }}
              disabled={isLogging}
            >
              {isLogging ? "Logging" : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-3 w-100">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} ChatHive. All rights reserved.
        </small>
      </footer>
    </div>
  );
};

export default LoginPage;
