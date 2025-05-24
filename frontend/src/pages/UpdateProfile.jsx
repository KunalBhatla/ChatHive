import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import profilePlaceholder from "../assets/profilePlaceholder.jpg";
import { FaPen } from "react-icons/fa";
import { updateCurrentUserDetails } from "../stores/authStore/authThunks";

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

const UpdateProfile = () => {
  const { user, isUpdating } = useSelector((state) => state.auth || {});
  const [preview, setPreview] = useState(
    user?.profilePic ? `${baseUrl}${user.profilePic}` : profilePlaceholder
  );
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      profile: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      mobileNumber: Yup.string()
        .matches(/^\d{10}$/, "Must be exactly 10 digits")
        .optional(),
    }),
    onSubmit: async (values) => dispatch(updateCurrentUserDetails(values)),
  });

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("profile", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center p-4">
      <h3 className="mb-4">Update Profile</h3>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column gap-3"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {/* Profile Pic Preview with Edit Icon */}
        <div className="text-center position-relative">
          <img
            src={preview}
            alt="Profile Preview"
            className="rounded-circle mb-2"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="btn btn-sm btn-light rounded-circle position-absolute"
            style={{
              top: 0,
              right: "calc(50% - 50px)",
              transform: "translate(50%, -50%)",
              border: "1px solid #bbb",
            }}
          >
            <FaPen size={12} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* First Name */}
        <div>
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            type="text"
            className={`form-control ${
              formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
            }`}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            type="text"
            className={`form-control ${
              formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""
            }`}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="form-label">Mobile Number</label>
          <input
            name="mobileNumber"
            type="text"
            className={`form-control ${
              formik.touched.mobileNumber && formik.errors.mobileNumber
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber && (
            <div className="invalid-feedback">{formik.errors.mobileNumber}</div>
          )}
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formik.values.email}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
