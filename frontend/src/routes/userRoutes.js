import { lazy } from "react";

const LoginPageComponent = lazy(() => import("../pages/LoginPage"));
const RegisterPageComponent = lazy(() => import("../pages/RegisterPage"));

export const userRoutes = [
  {
    title: "Login",
    component: LoginPageComponent,
    path: "/login",
    checkToken: true,
  },
  {
    title: "Register",
    component: RegisterPageComponent,
    path: "/register",
    checkToken: true,
  },
];
