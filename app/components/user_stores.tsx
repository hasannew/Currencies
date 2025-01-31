"use client";
import React, { useState, useEffect } from "react";
//import Ho from './components/mo';

import User_DataTable from "../components/User_DataTable";
import axios from "axios";
import { Column } from "./DataTable";

interface currency {
  id: string;
  name: string;
  store_name: string;
  state: string;
  city: string;
  price: GLfloat;
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
  { key: "state", label: "State", type: "string", sortable: true },
  { key: "city", label: "City", type: "string", sortable: true },
  { key: "address", label: "Address", type: "string", sortable: true },
  { key: "email", label: "Email", type: "string", sortable: true },
  { key: "phone", label: "Phone", type: "string", sortable: true },
  { key: "currencies", label: "Currencies", type: "string", sortable: true },
  { key: "bulletin", label: "Bulletin", type: "bulletin", sortable: true },
  { key: "created at", label: "Created At", type: "datetime", sortable: true },
];
export default function User_Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredstores, setfiltered_Stores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState(false);
  const [storename, setStorename] = useState("");

  const handleSort = () => {
    // Handle sort logic
  };

  const handleSearch = (searchTerm: string) => {
    // Handle search logic
    console.log(searchTerm);
    setStorename(searchTerm);
    setsearch(true);
  };

  useEffect(() => {
    const getstores = async () => {
      const res = await axios.post("/api/stores", { type: "stores" });
      console.log(res.data.stores);
      setStores(res.data.stores);
      setIsLoading(false);
    };
    getstores();
  }, []);

  useEffect(() => {
    if (search) {
      setsearch(true);
      // Filter the projects array based on the name
      const filteredStores = stores.filter((store) => store.name === storename);
      stores.forEach((store) => console.log(store.name));
      if (
        filteredStores.length == 0 &&
        (storename == " " || storename == " " || storename == "")
      ) {
        setfiltered_Stores(stores);
      } else {
        setfiltered_Stores(filteredStores);
      }
    }
  }, [setStorename, storename, setsearch, search, stores]);
  return (
    <>
      <User_DataTable<Store>
        columns={columns}
        data={stores}
        filtered_data={filteredstores}
        itemsPerPage={10}
        onSort={handleSort}
        onSearch={handleSearch}
        isLoading={isLoading}
        isSearching={search}
      />
    </>
  );
}
