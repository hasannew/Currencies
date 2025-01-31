import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "@/app/components/Notification/Toast";
import { Price } from "./prices";
const BulletinForm = () => {
  // Available products list
  const availableProducts = ["USD", "EURO", "GOLD"];
  const [prices, setPrices] = useState<Price[]>([]);
  const [storeInfo, setStoreInfo] = useState({
    storeName: "",
    state: "",
    city: "",
  });

  const [products, setProducts] = useState([
    { id: 1, name: "", sale_price: "", purchase_price: "" },
  ]);

  const [errors, setErrors] = useState({
    storeInfo: { storeName: "", state: "", city: "" },
    products: "",
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

  // Get remaining available products (not yet selected)
  const getAvailableProductOptions = (currentProductId: number) => {
    const selectedProducts = products
      .filter((p) => p.id !== currentProductId && p.name) // Exclude current product and empty selections
      .map((p) => p.name);

    return availableProducts.filter(
      (product) => !selectedProducts.includes(product)
    );
  };

  const handleStoreInfoChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.target) {
      const { name, value } = e.target;
      setStoreInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductChange = (id: number, field: string, value: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          return { ...product, [field]: value };
        }
        return product;
      })
    );
  };

  const addProduct = () => {
    // Check if there are any available products left
    const usedProducts = products.map((p) => p.name);
    const remainingProducts = availableProducts.filter(
      (p) => !usedProducts.includes(p)
    );

    if (remainingProducts.length > 0) {
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [
        ...prev,
        { id: newId, name: "", sale_price: "", purchase_price: "" },
      ]);
    }
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const validateForm = () => {
    const newErrors = {
      storeInfo: { storeName: "", state: "", city: "" },
      products: "",
    };

    // Validate store info
    if (!storeInfo.storeName.trim()) {
      newErrors.storeInfo.storeName = "Store name is required";
    }
    if (!storeInfo.state) {
      newErrors.storeInfo.state = "State is required";
    }
    if (!storeInfo.city.trim()) {
      newErrors.storeInfo.city = "City is required";
    }

    const price: Price[] = [];
    prices.map((p) => {
      if (p.state == storeInfo.state && p.city == storeInfo.city) {
        price.push(p);
        console.log(p);
      }
    });
    console.log(prices);
    console.log(price);

    // Validate products
    products.forEach((product) => {
      if (!product.name) {
        newErrors.products = "Please select a product";
      }
      if (!product.sale_price.trim()) {
        newErrors.products = "Sale Price is required";
      } else if (isNaN(parseFloat(product.sale_price))) {
        newErrors.products = "Sale Price must be a number";
      } //else if (price.length!= 0 && (Number(product.sale_price) > price[0].max_sale_price || Number(product.sale_price) < price[0].min_sale_price || Number(product.sale_price)<=0))
      // {newErrors.products = 'Your Sale Price is out of range';}
      if (!product.purchase_price.trim()) {
        newErrors.products = "Purchase Sale Price is required";
      } else if (isNaN(parseFloat(product.purchase_price))) {
        newErrors.products = "Purchase Price must be a number";
      }
      // else if (price.length!= 0 && (Number(product.purchase_price) > price[0].max_purchase_price || Number(product.purchase_price) < price[0].min_purchase_price || Number(product.purchase_price)<=0))
      //{newErrors.products = 'Your Purchase Price is out of range';}
    });
    setErrors(newErrors);

    return (
      !newErrors.storeInfo.storeName &&
      !newErrors.storeInfo.state &&
      !newErrors.storeInfo.city &&
      !newErrors.products
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const bulletinData = {
        ...storeInfo,
        products: products.map(({ ...product }) => ({
          ...product,
          sale_price: parseFloat(product.sale_price),
          purchase_price: parseFloat(product.purchase_price),
        })),
      };
      console.log(validateForm());
      console.log("Bulletin data:", bulletinData);
      const resp = await axios.post("/api/add_bulletin", {
        storeName: bulletinData.storeName,
        state: bulletinData.state,
        city: bulletinData.city,
        currencies: bulletinData.products,
      });
      if (resp.status == 200) {
        showToast.success({
          message: "Bulletin Added Sucessfully",
          duration: 5000,
        });
      } else {
        showToast.error({ message: "Error Adding Bullein", duration: 5000 });
      }
    }
  };
  useEffect(() => {
    const getbulletins = async () => {
      const res = await axios.post("/api/stores", {
        type: "prices",
      });
      console.log(res.data.prices);
      setPrices(res.data.prices);
      //setIsLoading(false);
    };
    getbulletins();
  }, []);
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>
        Bulletin Information
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Store Information Section */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ marginBottom: "15px", color: "black" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Store Name:
            </label>
            <input
              type="text"
              name="storeName"
              value={storeInfo.storeName}
              onChange={handleStoreInfoChange}
              style={{
                width: "100%",
                padding: "8px",
                border: errors.storeInfo.storeName
                  ? "1px solid red"
                  : "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errors.storeInfo.storeName && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.storeInfo.storeName}
              </span>
            )}
          </div>

          <div style={{ marginBottom: "15px", color: "black" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              State:
            </label>
            <select
              name="state"
              value={storeInfo.state}
              onChange={handleStoreInfoChange}
              style={{
                width: "100%",
                padding: "8px",
                border: errors.storeInfo.state
                  ? "1px solid red"
                  : "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.storeInfo.state && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.storeInfo.state}
              </span>
            )}
          </div>

          <div style={{ marginBottom: "15px", color: "black" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              City:
            </label>
            <input
              type="text"
              name="city"
              value={storeInfo.city}
              onChange={handleStoreInfoChange}
              style={{
                width: "100%",
                padding: "8px",
                border: errors.storeInfo.city
                  ? "1px solid red"
                  : "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errors.storeInfo.city && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.storeInfo.city}
              </span>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 style={{ marginBottom: "15px", color: "black" }}>Products</h3>

          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #eee",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "4px",
              }}
            >
              <div style={{ marginBottom: "15px", color: "black" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Product:
                </label>
                <select
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(product.id, "name", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: errors.products
                      ? "1px solid red"
                      : "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select a product</option>
                  {getAvailableProductOptions(product.id).map((productName) => (
                    <option key={productName} value={productName}>
                      {productName}
                    </option>
                  ))}
                </select>
                {errors.products && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {errors.products}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: "15px", color: "black" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Purchase Price:
                </label>
                <input
                  type="text"
                  value={product.purchase_price}
                  onChange={(e) =>
                    handleProductChange(
                      product.id,
                      "purchase_price",
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: errors.products
                      ? "1px solid red"
                      : "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Sale Price:
                </label>
                <input
                  type="text"
                  value={product.sale_price}
                  onChange={(e) =>
                    handleProductChange(
                      product.id,
                      "sale_price",
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: errors.products
                      ? "1px solid red"
                      : "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                {errors.products && (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {errors.products}
                  </span>
                )}
              </div>

              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove Product
                </button>
              )}
            </div>
          ))}

          {products.length > 0 && (
            <button
              type="button"
              onClick={addProduct}
              style={{
                backgroundColor: "#059669",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Add Another Product
            </button>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Submit Bulletin
        </button>
      </form>
    </div>
  );
};

export default BulletinForm;
