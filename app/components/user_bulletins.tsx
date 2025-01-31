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
  { key: "store", label: "Store", type: "Store", sortable: true },
  { key: "storeid", label: "StoreID", type: "string", sortable: true },
  { key: "date", label: "Date", type: "datetime", sortable: true },
  { key: "state", label: "State", type: "string", sortable: true },
  { key: "City", label: "City", type: "string", sortable: true },
  { key: "products", label: "Products", type: "currency []", sortable: true },
  { key: "created at", label: "Created At", type: "datetime", sortable: true },
  { key: "updated at", label: "Updated At", type: "datetime", sortable: true },
];
export default function User_Bulletins() {
  const [bulletins, setBulletins] = useState<bulletin[]>([]);
  const [filteredbulletins, setfiltered_Bulletins] = useState<bulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState(false);
  const [bulletinname, setBulletinname] = useState("");

  const handleSort = () => {
    // Handle sort logic
  };

  const handleSearch = (searchTerm: string) => {
    // Handle search logic
    console.log(searchTerm);
    setBulletinname(searchTerm);
    setsearch(true);
  };

  useEffect(() => {
    const getbulletins = async () => {
      const res = await axios.post("/api/stores", {
        type: "bulletins",
      });
      console.log(res.data.bulletins);
      setBulletins(res.data.bulletins);
      setIsLoading(false);
    };
    getbulletins();
  }, [bulletins, setBulletins]);
  useEffect(() => {
    if (search) {
      setsearch(true);
      // console
      // Filter the projects array based on the name
      //const filteredBulletins = bulletins.filter(bulletin => bulletin.store.name === bulletinname);
      bulletins.forEach((bulletin) => console.log(bulletin));
      // if (filteredBulletins.length==0 && (bulletinname== ' '|| bulletinname== ' '|| bulletinname=='')) {
      setfiltered_Bulletins(bulletins);
      // }
      //else {
      //  setfiltered_Bulletins(filteredBulletins);}
    }
  }, [setBulletinname, bulletinname, setsearch, search, bulletins]);
  return (
    <>
      <User_DataTable<bulletin>
        columns={columns}
        data={bulletins}
        filtered_data={filteredbulletins}
        itemsPerPage={10}
        onSort={handleSort}
        onSearch={handleSearch}
        isLoading={isLoading}
        isSearching={search}
      />
    </>
  );
}
