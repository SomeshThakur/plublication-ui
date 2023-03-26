import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import useAuth from "../../utils/useAuth";
import styles from "./styles.module.css";

export const MainLayout: FunctionComponent = (): JSX.Element => {
  const { userAuth } = useAuth();
  return (
    <div className={styles["main-layout"]}>
      <Header />
      {userAuth?.authed && <Sidebar userType={userAuth?.role?.name} />}
      <section className={styles["body-section"]}>
        <Outlet />
      </section>
    </div>
  );
};
