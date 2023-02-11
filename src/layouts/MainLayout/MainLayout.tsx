import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import styles from "./styles.module.css";

export const MainLayout: FunctionComponent = (): JSX.Element => {
  return (
    <div className={styles["main-layout"]}>
      <Header />
      <Sidebar userType="Editor" />
      <section className={styles["body-section"]}>
        <Outlet />
      </section>
    </div>
  );
};
