import { Navigate, useRoutes } from "react-router-dom";
import { OrdersGrid } from "./components/OrdersGrid/OrderGrid";
import { PaymentsGrid } from "./components/PaymentsGrid/PaymentsGrid";
import { Profile } from "./components/Profile/Profile";
import { PublicationsGrid } from "./components/PublicationsGrid/PublicationsGrid";
import { UsersGrid } from "./components/UsersGrid/UsersGrid";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import Dashboard from "./components/Daashboard/Dashboard";
import { Login } from "./pages/Login";
import { pages } from "./types/pages";
import { RequireAuth } from "./utils/requireAuth";
import { SignUp } from "./pages/Signup/Singup";

const RequireLoginWrapper = (children: any) => <RequireAuth>{children}</RequireAuth>

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: RequireLoginWrapper(<MainLayout />),
      children: [
        {
          path: pages.Dashboard,
          element: RequireLoginWrapper(<Dashboard />)
        },
        {
          path: pages["All Publications"],
          element: RequireLoginWrapper(<PublicationsGrid />),
        },
        {
          path: pages["All Orders"],
          element: RequireLoginWrapper(<OrdersGrid />),

        },
        {
          path: pages["All Payments"],
          element: RequireLoginWrapper(<PaymentsGrid />)
        },
        {
          path: pages["All Users"],
          element: RequireLoginWrapper(<UsersGrid />)
        },
        {
          path: pages["My Publications"],
          element: RequireLoginWrapper(<PublicationsGrid />),
        },
        {
          path: pages["My Payments"],
          element: RequireLoginWrapper(<PaymentsGrid />)
        },
        {
          path: pages["My Profile"], element: RequireLoginWrapper(<Profile />)
        },

      ],
    },
    { path: 'login', element: <Login /> },
    { path: 'signup', element: <SignUp /> },
    {
      path: "404",
      element: RequireLoginWrapper(<center>Wrong URL</center>),
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
