import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegisterUserApi } from "../Api/AuthServices";
import { showErrorToast, showSuccessToast } from "../components/common/toastUtils";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleRegister = async (data) => {
    try {
      const response = await RegisterUserApi(data);
      navigate("/login");
      showSuccessToast(response?.message || "Successful");
    } catch (error) {
      console.log("Error in register ->", error);
      if (step !== 1) back();
      showErrorToast(error?.response?.data?.message || "Something went wrong...!");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      profile: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center bg-light"
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      <div className="w-100 d-flex justify-content-end mb-3">
        <span>
          Already have an account?
          <NavLink to={"/login"}>Login</NavLink>
        </span>
      </div>

      <div
        className="card shadow w-100"
        style={{ maxWidth: "500px", overflow: "hidden" }}
      >
        <div
          className="progress"
          style={{ height: "6px" }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${step * 50}%`, backgroundColor: "#C8A2C8" }}
          />
        </div>

        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4">
            {step === 1 ? "Step 1: Basic Info" : "Step 2: Additional Info"}
          </h4>

          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            {step === 1 && (
              <>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">First Name *</label>
                    <input
                      name="firstName"
                      type="text"
                      className={`form-control ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className="form-control"
                      {...formik.getFieldProps("lastName")}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
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

                <div className="mb-4">
                  <label className="form-label">Password *</label>
                  <input
                    name="password"
                    type="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn w-100"
                  style={{ backgroundColor: "#6A4573", color: "#fff" }}
                  onClick={next}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    name="mobileNumber"
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("mobileNumber")}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Profile Picture</label>
                  <input
                    name="profile"
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      formik.setFieldValue("profile", e.currentTarget.files[0])
                    }
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={back}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#C8A2C8", color: "#fff" }}
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <footer className="text-center mt-3 w-100">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} ChatHive. All rights reserved.
        </small>
      </footer>
    </div>
  );
};

export default RegisterPage;
