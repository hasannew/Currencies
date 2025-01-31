"use client";
import { useEffect, useState } from "react";

import { getGoldPrices } from "../lib/actions";
import GoldPriceDisplay, { GoldPrice } from "./Gold";

// In your page or parent component
const Gold_Prices = () => {
  const [goldData, setGoldData] = useState<GoldPrice[]>([]);

  // Fetch data from your API
  useEffect(() => {
    const fetchData = async () => {
      // Your API fetch logic here
      const data = await getGoldPrices();
      console.log(data);
      setGoldData(data);
    };

    fetchData();
  }, []);

  return <GoldPriceDisplay data={goldData} />;
};

export default Gold_Prices;
