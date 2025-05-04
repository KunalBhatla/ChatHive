import { lazy } from "react";

const LoginPageComponent = lazy(() => import("../pages/LoginPage"));
const RegisterPageComponent = lazy(() => import("../pages/RegisterPage"));
const HomePageComponent = lazy(() => import("../pages/Homepage"));

export const userRoutes = [
  {
    title: "Login",
    component: LoginPageComponent,
    path: "/login",
    checkToken: false,
  },
  {
    title: "Register",
    component: RegisterPageComponent,
    path: "/register",
    checkToken: false,
  },
  {
    title: "Home",
    component: HomePageComponent,
    path: "/",
    checkToken: true,
  },
];
