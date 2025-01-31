"use client";
import React, { useState, useEffect } from "react";

import DataTable from "../components/DataTable";
import axios from "axios";

import { showToast } from "../components/Notification/Toast";
import { Column } from "./User_DataTable";
import { bulletin, Store } from "../lib/types";

export interface Price {
  id: string;
  [key: string]: string | GLfloat | Store | bulletin[] | Date | null;
}
/*
export interface Price {
  id: string;
  name: string;
  date: Date | null;
  sale_price: GLfloat;
  sale_std: GLfloat;
  purchase_price: GLfloat;
  purchase_std: GLfloat;
  sale_percentageChange: GLfloat | null;
  purchase_percentageChange: GLfloat | null;
  max_sale_price: GLfloat | null;
  min_sale_price: GLfloat | null;
  max_purchase_price: GLfloat | null;
  min_purchase_price: GLfloat | null;
  state: string | null;
  city: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}*/
// Column definitions
const columns: Column[] = [
  { key: "id", label: "ID", type: "string", sortable: true },
  { key: "name", label: "name", type: "string", sortable: true },
  { key: "date", label: "Date", type: "datetime", sortable: true },
  { key: "sale_price", label: "Sale_Price", type: "number", sortable: true },
  {
    key: "purchase_price",
    label: "Purchase_Price",
    type: "number",
    sortable: true,
  },
  { key: "state", label: "State", type: "string", sortable: true },
  { key: "City", label: "City", type: "string", sortable: true },
  { key: "created at", label: "Created At", type: "datetime", sortable: true },
  { key: "updated at", label: "Updated At", type: "datetime", sortable: true },
];
export default function Prices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [filteredPrices, setfiltered_Prices] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState(false);
  const [pricename, setPricename] = useState("");

  //const [socket_state, setSocket_state] = useState('try connecting...');
  //const [socket, setSocket] = useState(null);

  /*useEffect(() => {
      //fetch('api/pages');
      const s = io('', {
        path: "/api/pages"
      });
      setSocket(s);
    }, []);
    if (socket) {
      socket.on('connect', () => {
        console.log('connected successfully', socket.id);
        setSocket_state('connected successfully 👍');
      });
    }*/
  const handleAdd = () => {
    // Handle add logic
  };

  const handleDelete = async (price: Price) => {
    // Handle delete logic
    const res = await axios.post("/api/delete", {
      type: "prices",
      id: price.id,
    });
    if (res.status == 200) {
      showToast.success({
        message: "Price Deleted Succefully",
        duration: 5000,
      });
      const filteredPrices = prices.filter((p) => p.id != price.id);
      setPrices(filteredPrices);
      setfiltered_Prices(filteredPrices);
    } else {
      showToast.error({ message: "Error Deleting Price", duration: 5000 });
    }
  };

  const handleSort = () => {
    // Handle sort logic
  };

  const handleSearch = (searchTerm: string) => {
    // Handle search logic
    setsearch(false);
    console.log(searchTerm);
    setPricename(searchTerm);
    setsearch(true);
  };

  useEffect(() => {
    const getbulletins = async () => {
      const res = await axios.post("/api/stores", {
        type: "prices",
      });
      console.log(res.data.prices);
      setPrices(res.data.prices);
      setIsLoading(false);
    };
    getbulletins();
  }, [prices, setPrices]);
  useEffect(() => {
    if (search) {
      setsearch(true);
      // Filter the projects array based on the name
      const filteredPrices = prices.filter((price) => price.name === pricename);
      //filteredPrices.forEach(price => console.log(price.name));
      if (
        filteredPrices.length == 0 &&
        (pricename == " " || pricename == " " || pricename == "")
      ) {
        setfiltered_Prices(prices);
        console.log(filteredPrices);
      } else {
        setfiltered_Prices(filteredPrices);
        console.log(filteredPrices);
      }
    }
  }, [setPricename, pricename, setsearch, search, prices]);
  /*useEffect(() => {
      const socket: Socket = io();
      socket.on('updates', (updates:any) => {
        console.log(updates)
        setPrices(prevData => [...prevData, ...updates]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);*/
  /*useEffect(() => {
      if (socket.connected) {
        onConnect();
      }
  
      function onConnect() {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
  
        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      }
  
      function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
      }
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }, []);*/
  return (
    <>
      <DataTable<Price>
        columns={columns}
        data={prices}
        filtered_data={filteredPrices}
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
