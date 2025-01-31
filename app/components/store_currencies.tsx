"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

import User_DataTable from "./User_DataTable";
import { Column } from "./DataTable";

interface currency {
  id: string;
  name: string;
  store_name: string;
  state: string;
  city: string;
  sale_price: GLfloat;
  purchase_price: GLfloat;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  bulletin: bulletin[];
}
interface bulletin {
  id: string;
  store: Store;
  storeid: string;
  date: Date;
  state: string;
  city: string;
  products: currency[];
  createdAt: Date;
  updatedAt: Date;
}
interface Store {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  currencies: string;
  bulletin: bulletin[];
  createdAt: Date;
}
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
export default function Store_Currencies() {
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const [filteredcurrencies, setfiltered_Currencies] = useState<currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState(false);
  const [currencyname, setCurrencyname] = useState("");

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
      const res = await axios.post("/api/store_data", { type: "currencies" });
      console.log(res.data.currencies);
      setCurrencies(res.data.currencies);
      setIsLoading(false);
    };
    getbulletins();
  }, [currencies, setCurrencies]);
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
      <User_DataTable<currency>
        columns={columns}
        data={currencies}
        filtered_data={filteredcurrencies}
        itemsPerPage={10}
        onSort={handleSort}
        onSearch={handleSearch}
        isLoading={isLoading}
        isSearching={search}
      />
    </>
  );
}
