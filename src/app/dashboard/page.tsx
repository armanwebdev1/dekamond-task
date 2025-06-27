"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DashboardPage.module.scss";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.replace("/auth");
    } else {
      const user = JSON.parse(stored);
      setUserName(`${user.name.first} ${user.name.last}`);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <h1>داشبورد</h1>
          {userName && (
            <p>
              خوش آمدید
              <br />
              <br /> {userName}
            </p>
          )}
          <button onClick={handleLogout}>خروج</button>
        </div>
      </div>
    </div>
  );
}
