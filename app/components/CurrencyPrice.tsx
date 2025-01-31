'use client'
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card  from '@/app/components/ui/card';
import axios from 'axios';

// Type definitions
interface CurrencyPrice {
  id: string;
  name: string;
  //symbol: string;
  sale_price: number;
  purchase_price: number;
  location: {
    state: string;
    city?: string;
  };
  sale_percentageChange: number;
  purchase_percentageChange: number;
  //previousPrice: number;
  //color?: string;
}

// Currency symbols and colors mapping
const CURRENCY_STYLES = {
  'GOLD': { symbol: '₯', color: '#FFD700' },
  'SILVER': { symbol: 'Ag', color: '#C0C0C0' },
  'USD': { symbol: '$', color: '#85bb65' },
  'EUR': { symbol: '€', color: '#0052B4' },
  'GBP': { symbol: '£', color: '#682D7D' },
  'DEFAULT': { symbol: '¤', color: '#6B7280' }
} as const;

const CurrencyPriceComponent = () => {
  const [prices, setPrices] = useState<CurrencyPrice[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to format price with proper decimal places
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Function to get currency style
  const getCurrencyStyle = (currencyName: string) => {
    const key = currencyName.toUpperCase() as keyof typeof CURRENCY_STYLES;
    return CURRENCY_STYLES[key] || CURRENCY_STYLES.DEFAULT;
  };

  // Fetch data from API
  const fetchPrices = async () => {
    try {
      const response = await axios.post('/api/stores',{type:'prices'});
      const data = await response.data.prices;
      const prices_now: CurrencyPrice[] =  []
      for (const p of data) {
       prices_now.push({
        id:p.id,
        name:p.name,
        sale_price: p.sale_price,
        purchase_price: p.purchase_price,
        location: {
          state: p.state,
          city: p.city,
        },
        sale_percentageChange:p.sale_percentageChange,
        purchase_percentageChange:p.purchase_percentageChange
      })
      //console.log(data)
     // const prices = data.map((p:any)=>{id:p.id,name:p.name,price:p.sale_price,percentageChange:p.percentageChange,})
      setPrices(prices_now);
      setLoading(false);
    } }catch (error) {
      console.error('Error fetching prices:', error);
      setLoading(false);
    }
  };

  // Set up periodic updates
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {prices.map((currency) => {
        const style = getCurrencyStyle(currency.name);
      
        return (
          <Card 
            key={currency.id}
            className="p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-row gap-1 items-center justify-between">
              <div className="flex items-center space-x-2">
                <span 
                  className="text-2xl font-bold"
                  style={{ color: style.color }}
                >
                  {style.symbol}
                </span>
                <div>
                  <h3 className="font-semibold text-lg">{currency.name}</h3>
                  <p className="text-sm text-gray-600">
                    {currency.location.state}
                    {currency.location.city && `, ${currency.location.city}`}
                  </p>
                </div>
              </div>
              
                {/* Sale Price Section */}
                <div className="border-t pt-2">
                <div className="flex flex-col gap-5 justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Sale</span>
                  <div className="flex flex-col gap-5 text-right">
                    <div className="text-md font-bold">
                      {formatPrice(currency.sale_price)} {`SP`}
                    </div>
                    <div className={`flex items-center justify-end text-sm ${
                      currency.sale_percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currency.sale_percentageChange >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(currency.sale_percentageChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Price Section */}
              <div className="border-t pt-2">
                <div className="flex flex-col gap-5 justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Purchase</span>
                  <div className="flex flex-col gap-5 text-right">
                    <div className="text-md font-bold">
                      {formatPrice(currency.purchase_price)} {`SP`}
                    </div>
                    <div className={`flex items-center justify-end text-sm ${
                      currency.purchase_percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currency.purchase_percentageChange >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(currency.purchase_percentageChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CurrencyPriceComponent;