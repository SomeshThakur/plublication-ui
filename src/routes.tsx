import { Navigate, useRoutes } from "react-router-dom";

import Dashboard from "./components/Daashboard/Dashboard";
import CreateOrderForm from "./components/OrdersGrid/CreateOrder/CreateOrder";
import { OrdersGrid } from "./components/OrdersGrid/OrderGrid";
import { PaymentsGrid } from "./components/PaymentsGrid/PaymentsGrid";
import { Profile } from "./components/Profile/Profile";
import CreatePublicationSection from "./components/PublicationSectionsGrid/CreatePublicationSection/CreatePublicationSection";
import { PublicationSectionsGrid } from "./components/PublicationSectionsGrid/PublicationSectionsGrid";
import { PublicationForm } from "./components/PublicationsGrid/CreatePublication/CreatePublicationForm";
import { PublicationsGrid } from "./components/PublicationsGrid/PublicationsGrid";
import { CreateUserForm } from "./components/UsersGrid/CreateUser/CreateUser";
import { UsersGrid } from "./components/UsersGrid/UsersGrid";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup/Singup";
import { pages } from "./types/pages";
import { RequireAuth } from "./utils/requireAuth";

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
          path: pages["Create Publication"],
          element: RequireLoginWrapper(<PublicationForm />),
        },
        {
          path: pages["All Orders"],
          element: RequireLoginWrapper(<OrdersGrid />),
        },
        {
          path: pages["Create Order"],
          element: RequireLoginWrapper(<CreateOrderForm />),
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
          path: pages["Create User"],
          element: RequireLoginWrapper(<CreateUserForm />)
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
          path: "/:publicationID/:categoryID/" + pages["Publication Sections"],
          element: RequireLoginWrapper(<PublicationSectionsGrid />)
        }, {
          path: "/:publicationID/:categoryID/" + pages["Create Publication Section"],
          element: RequireLoginWrapper(<CreatePublicationSection />)
        },
        {
          path: pages["My Profile"], element: RequireLoginWrapper(<Profile />)
        },

      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
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
