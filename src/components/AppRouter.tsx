import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../utils/routes";
import { LOGIN_ROUTE, CHAT_ROUTE } from "../utils/consts";
import { useAuth } from "../hooks/useAuth";
import { AppRoute } from "../utils/interfaces";

const AppRouter: React.FC = () => {
  const { isAuth } = useAuth();
  const routesToRender: AppRoute[] = isAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
      {routesToRender.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={isAuth ? CHAT_ROUTE : LOGIN_ROUTE} />}
      />
    </Routes>
  );
};

export default AppRouter;
