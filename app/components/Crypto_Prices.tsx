'use client'
import { useEffect, useState } from "react";
import CryptoPriceDisplay from "./Crypto";
import { getCoins} from "../lib/actions";

// In your page or parent component
const Crypto_Prices =  () => {
    const [cryptoData, setCryptoData] = useState([]);
  
    // Fetch data from your API
    useEffect(() => {
      const fetchData = async () => {
        // Your API fetch logic here
        const data = await getCoins();
       // await getGoldPrices();
        /*const r = await getMetals();
        console.log(r);*/
        setCryptoData(data);
      };
      
      fetchData();
    }, []);
  
    return <CryptoPriceDisplay cryptocurrencies={cryptoData} />;
  };

  export default Crypto_Prices;