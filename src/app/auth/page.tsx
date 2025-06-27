"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthPage.module.scss";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validatePhone = (num: string) => /^(\+98|0)?9\d{9}$/.test(num);

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError("شماره تلفن معتبر نیست.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const { results } = await res.json();
      localStorage.setItem("user", JSON.stringify(results[0]));
      router.push("/dashboard");
    } catch (err) {
      setError("خطایی رخ داده است.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className={styles.right}
        >
          <h1>خوش آمدید</h1>
          <p>برای ورود به پنل کاربری، شماره تلفن خود را وارد نمایید.</p>
          <input
            type="text"
            placeholder="مثلاً 09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <span className={styles.error}>{error}</span>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
