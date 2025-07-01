
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Accessible Mail</h2>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/dashboard/inbox" className={styles.navLink}>Inbox</Link>
            </li>
            <li>
              <Link to="/dashboard/sent" className={styles.navLink}>Sent</Link>
            </li>
            <li>
              <Link to="/dashboard/compose" className={styles.navLink}>Compose</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;