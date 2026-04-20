import { createBrowserRouter } from "react-router";
import LoginScreen from "./screens/LoginScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import SuccessScreen from "./screens/SuccessScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/task",
    Component: TaskFormScreen,
  },
  {
    path: "/success",
    Component: SuccessScreen,
  },
]);
