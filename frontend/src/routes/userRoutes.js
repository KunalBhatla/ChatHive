import { lazy } from "react";

const LoginPageComponent = lazy(() => import("../pages/LoginPage"));
const RegisterPageComponent = lazy(() => import("../pages/RegisterPage"));
const HomePageComponent = lazy(() => import("../pages/Homepage"));
const ChatPageComponent = lazy(() => import("../pages/Chat/ChatPage"));
const MusicComponent = lazy(() => import("../pages/Music/MusicPage"));
const SettingsComponent = lazy(() => import("../pages/SettingsPage"));

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
  {
    title: "Chats",
    component: ChatPageComponent,
    path: "/chats",
    checkToken: true,
  },
  {
    title: "Musics",
    component: MusicComponent,
    path: "/music",
    checkToken: true,
  },
  {
    title: "Settings",
    component: SettingsComponent,
    path: "/settings",
    checkToken: true,
  },
];
