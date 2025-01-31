"use client";
import React, { useState, useEffect } from "react";
//import Ho from './components/mo';
import DataTable from "../components/DataTable";
import axios from "axios";
import BulletinForm from "../components/BulletinForm";
import { showToast } from "../components/Notification/Toast";
import { Column } from "./User_DataTable";
import { bulletin } from "../lib/types";

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
export default function Store_Bulletins() {
  const [bulletins, setBulletins] = useState<bulletin[]>([]);
  const [filteredbulletins, setfiltered_Bulletins] = useState<bulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setsearch] = useState(false);
  const [bulletinname, setBulletinname] = useState("");
  const handleAdd = () => {
    // Handle add logic
    setIsOpen(true);
  };

  const handleDelete = async (bulletin: bulletin) => {
    // Handle delete logic
    const res = await axios.post("/api/delete", {
      type: "bulletins",
      id: bulletin.id,
    });
    if (res.status == 200) {
      showToast.success({
        message: "Bulletin Deleted Succefully",
        duration: 5000,
      });
      const filteredBulletins = bulletins.filter(
        (bull) => bull.id != bulletin.id
      );
      setBulletins(filteredBulletins);
      setfiltered_Bulletins(filteredBulletins);
    } else {
      showToast.error({ message: "Error Deleting Bulletin", duration: 5000 });
    }
  };

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
      // setfiltered_Bulletins(bulletins)
      // }
      //else {
      //  setfiltered_Bulletins(filteredBulletins);}
    }
  }, [setBulletinname, bulletinname, setsearch, search, bulletins]);
  return (
    <>
      <DataTable<bulletin>
        columns={columns}
        data={bulletins}
        filtered_data={filteredbulletins}
        itemsPerPage={10}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onSort={handleSort}
        onSearch={handleSearch}
        isLoading={isLoading}
        isSearching={search}
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <div
        className={`flex-1 fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <BulletinForm />
      </div>
    </>
  );
}
