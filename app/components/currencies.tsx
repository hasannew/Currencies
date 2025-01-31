"use client";
import React, { useState, useEffect } from "react";

import DataTable, { Column } from "../components/DataTable";
import axios from "axios";
import { showToast } from "../components/Notification/Toast";
import { currency } from "../lib/types";

// Column definitions
const columns: Column[] = [
  { key: "id", label: "ID", type: "string", sortable: true },
  { key: "name", label: "Name", type: "string", sortable: true },
  { key: "store_name", label: "Store Name", type: "string", sortable: true },
  { key: "state", label: "State", type: "string", sortable: true },
  { key: "City", label: "City", type: "string", sortable: true },
  { key: "sale_price", label: "Sale_Price", type: "number", sortable: true },
  {
    key: "purchase_price",
    label: "Purchase_Price",
    type: "number",
    sortable: true,
  },
  { key: "date", label: "Date", type: "datetime", sortable: true },
  { key: "created at", label: "Created At", type: "datetime", sortable: true },
  { key: "updated at", label: "Updated At", type: "datetime", sortable: true },
  { key: "bulletins", label: "Bulletins", type: "bulletin []", sortable: true },
];
export default function Currencies() {
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const [filteredcurrencies, setfiltered_Currencies] = useState<currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState(false);
  const [currencyname, setCurrencyname] = useState("");

  const handleAdd = () => {
    // Handle add logic
  };

  const handleDelete = async (currency: currency) => {
    // Handle delete logic
    const res = await axios.post("/api/delete", {
      type: "currencies",
      id: currency.id,
    });
    if (res.status == 200) {
      showToast.success({
        message: "Currency Deleted Succefully",
        duration: 5000,
      });
      const filteredCurrencies = currencies.filter((c) => c.id != currency.id);
      setCurrencies(filteredCurrencies);
      setfiltered_Currencies(filteredCurrencies);
    } else {
      showToast.error({ message: "Error Deleting Currency", duration: 5000 });
    }
  };

  const handleSort = () => {
    // Handle sort logic
  };

  const handleSearch = (searchTerm: string) => {
    // Handle search logic
    console.log(searchTerm);
    setCurrencyname(searchTerm);
    setsearch(true);
  };

  useEffect(() => {
    const getbulletins = async () => {
      const res = await axios.post("/api/stores", { type: "currencies" });
      console.log(res.data.currencies);
      setCurrencies(res.data.currencies);
      setIsLoading(false);
    };
    getbulletins();
  }, []);
  useEffect(() => {
    if (search) {
      setsearch(true);
      // Filter the projects array based on the name
      const filteredCurrencies = currencies.filter(
        (store) => store.name === currencyname
      );
      currencies.forEach((currency) => console.log(currency.name));
      if (
        filteredCurrencies.length == 0 &&
        (currencyname == " " || currencyname == " " || currencyname == "")
      ) {
        setfiltered_Currencies(currencies);
      } else {
        setfiltered_Currencies(filteredCurrencies);
      }
    }
  }, [setCurrencyname, currencyname, setsearch, search, currencies]);
  return (
    <>
      <DataTable<currency>
        columns={columns}
        data={currencies}
        filtered_data={filteredcurrencies}
        itemsPerPage={10}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onSort={handleSort}
        onSearch={handleSearch}
        isLoading={isLoading}
        isSearching={search}
      />
    </>
  );
}
