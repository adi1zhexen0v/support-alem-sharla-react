import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import ReviewsPage from "../pages/ReviewsPage";
import { CHAT_ROUTE, LOGIN_ROUTE, REVIEWS_ROUTE } from "./consts";
import { AppRoute } from "./interfaces";

export const publicRoutes: AppRoute[] = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage
  }
];

export const privateRoutes: AppRoute[] = [
  {
    path: CHAT_ROUTE,
    element: ChatPage
  },
  {
    path: REVIEWS_ROUTE,
    element: ReviewsPage
  }
];