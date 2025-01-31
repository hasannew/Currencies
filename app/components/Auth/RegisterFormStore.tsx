"use client";

import styles from "../styles/auth.module.css";
import { register, validate } from "../../lib/auth";
import { formData } from "../../lib/types";
import { useState } from "react";

import { useMsg } from "@/context/MsgContext";
// import Captcha from "./Recaptcha";


export default function RegisterForm() {
  const { showMsg } = useMsg();
  const [validity,setValidity] = useState(false)
  const [errorMsg, setErrorMsg] = useState<formData>({
    username: "",
    password: "",
    email: "",
    passwordC: "",
    store_name: "",
    type: "",
    state:"",
    city:"",
    phone:"",
    address:""
  });
  const [formData, setFormData] = useState<formData>({
    username: "",
    password: "",
    email: "",
    passwordC: "",
    store_name: "",
    type: "store",
    state:"",
    city:"",
    phone:"",
    address:""
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
    if(!validity){
      showMsg('Check your input please','error'
      ) 
      return
    }
    try {
      const resp = await register(formData);
      if (resp.success) {
      //  showMsg(`We have sent a verification email to ${formData.email}, please check it out and verify`,'success')
      showMsg(`Registered`,'success')

      } else {
        showMsg(resp.message,'error')
      }
      
    } catch (err) {
      console.log(`Error:${err}`);
    }
  };
  const handleBlur = async () => {
    const valid = await validate(formData);
    setErrorMsg(valid.errors as unknown as formData);
    setValidity(valid.valid)
  };

  return (
    <section className={styles.main}>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Register 👤</h1>
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
              onBlur={handleBlur}
              type="text"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.username}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.entry}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.email}</p>
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
              onBlur={handleBlur}
              type="password"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.password}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="passwordC">
              Confirm Password
            </label>
            <input
              className={styles.entry}
              placeholder="Confirm Password"
              name="passwordC"
              value={formData.passwordC}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.passwordC}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="store_name">
              Store Name
            </label>
            <input
              className={styles.entry}
              placeholder="Store Name"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.store_name}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="state">
              State
            </label>
            <input
              className={styles.entry}
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.state}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="city">
              City
            </label>
            <input
              className={styles.entry}
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.city}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="address">
              Address
            </label>
            <input
              className={styles.entry}
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.address}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              className={styles.entry}
              placeholder="XXX-XXX-XXXX"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              required
            />
            <p className={styles.invalidInput}>{errorMsg.phone}</p>
          </div>
          <button className={styles.submitBtn} type="submit">
            Register
          </button>
          <p className={styles.switchText}>
            Already have an account?{" "}
            <a className={styles.switchLink} href="/auth/login">
              log in here
            </a>
          </p>
          <p className={styles.switchText}>
            Explore our srvices {" "}
            <a className={styles.switchLink} href="/auth/register">
              register as a customer
            </a>
          </p>
        </form>
      </section>
      { /* <Captcha action="homepage" /> */}
    </section>
  );
}
