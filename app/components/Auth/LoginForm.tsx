"use client";

import styles from "../styles/auth.module.css";
import { login } from "../../lib/auth";
import {loginformData } from "../../lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<loginformData>({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resp = await login(formData);
      if (resp.success) {
        router.push("/");
      } else {
        setErrorMsg(resp.message);
      }
      console.log(resp);
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
  return (
    <section className={styles.main}>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Login 🔒</h1>

          {errorMsg && (
            <p role="alert" className={styles.errorMsg}>
              ⚠️{" " + errorMsg}
            </p>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.entry}
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.entry}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            Login
          </button>
          <p className={styles.switchText}>
            Dont have an account?{" "}
            <a className={styles.switchLink} href="/auth/register">
              Create one
            </a>
          </p>
        </form>
        
      </section>
    </section>
  );
}
