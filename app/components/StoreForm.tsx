import React, { ChangeEvent, FormEvent, useState } from "react";
import { showToast } from "@/app/components/Notification/Toast";
import axios from "axios";
const BasicStoreForm = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    state: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    storeName: "",
    state: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    currency: "",
  });

  const states = [
    "Damascus",
    "Aleppo",
    "Lattakia",
    "Tartus",
    "Homs",
    "Hama",
    "Idlib",
    "Daraa",
    "Alsuida",
    "Alkonitira",
    "Deri-Alzor",
    "Al-raqaa",
    "Al-hasaka",
  ];

  const validateForm = () => {
    const newErrors = {
      storeName: "",
      state: "",
      city: "",
      address: "",
      email: "",
      phone: "",
      currency: "",
    };

    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    } else {
      newErrors.storeName = "";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    } else {
      newErrors.state = "";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else {
      newErrors.city = "";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else {
      newErrors.address = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    } else {
      newErrors.email = "";
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required (XXX-XXX-XXXX)";
    } else {
      newErrors.phone = "";
    }

    setErrors(newErrors);
    //console.log(Object.keys(errors).length)
    return (
      !newErrors.phone &&
      !newErrors.email &&
      !newErrors.phone &&
      !newErrors.address &&
      !newErrors.state &&
      !newErrors.city &&
      !newErrors.storeName
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(validateForm());
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission here
    }
    const resp = await axios.post("/api/add_store", {
      name: formData.storeName,
      state: formData.state,
      city: formData.city,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
    });
    if (resp.status == 200) {
      showToast.success({
        message: "Bulletin Added Sucessfully",
        duration: 5000,
      });
    } else {
      showToast.error({ message: "Error Adding Bullein", duration: 5000 });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length >= 6) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
          3,
          6
        )}-${cleaned.slice(6, 10)}`;
      } else if (cleaned.length >= 3) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
        Store Information
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="storeName"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Store Name:
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.storeName ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.storeName && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.storeName}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            State:
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.state ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.state}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.city ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.city && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.city}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.address ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.address && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.address}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.email ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="XXX-XXX-XXXX"
            style={{
              width: "100%",
              padding: "8px",
              border: errors.phone ? "1px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.phone && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.phone}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </form>
      {/*bulletin && <BulletinForm/>*/}
    </div>
  );
};

export default BasicStoreForm;
