"use client";
import styles from "@/app/components/styles/auth.module.css";
//import { sendPasswordResetMail } from "../../lib/mail";
import { useState } from "react";

import Captcha from "./Recaptcha";

export function ResetPaswordForm() {

  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /*const resetEmail = await sendPasswordResetMail(email);
    console.log(resetEmail.message);
    if (resetEmail.success)
      showMsg(`A Password Reset Email sent to ${email}, check it up`);
    else showMsg(resetEmail.message, "error");*/
  }
  return (
    <>
    <form className={styles.resetForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Account Email
        </label>
        <input
          className={styles.entry}
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />
      </div>
      <button className={styles.resetBtn} type="submit">
        Send Reset Email
      </button>
    </form>
    <Captcha action="homepage" />
    </>
  );
}
