import React from 'react';
import  { Card,CardContent, CardHeader, CardTitle }  from "@/app/components/ui/ex";
import { TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";
import { Badge } from "@/app/components/ui/ex";
// Type definitions
interface CryptoPrice {
    id: string;
    name: string;
    symbol: string;
    sale_price: number;
    purchase_price: number;
    quote: {
      USD: {
        price:number,
        percent_change_24h:number,
        market_cap:number
      }
    };
    last_updated: string
  }
interface data {
    cryptocurrencies: CryptoPrice[];
}
const CryptoPriceDisplay = ({ cryptocurrencies }:data) => {
  const formatPrice = (price:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
  };

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPercentageColor = (percentage :number) => {
    return percentage >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cryptocurrencies.map((crypto:CryptoPrice) => (
        <Card key={crypto.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              <div className="flex items-center gap-2">
                {crypto.name}
                <Badge variant="secondary" className="text-xs">
                  {crypto.symbol}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-2xl font-bold">
                    {formatPrice(crypto.quote.USD.price)}
                  </span>
                </div>
              </div>

              {/* 24h Change */}
              <div className="flex items-center gap-2">
                {crypto.quote.USD.percent_change_24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`font-semibold ${getPercentageColor(crypto.quote.USD.percent_change_24h)}`}>
                  {crypto.quote.USD.percent_change_24h.toFixed(2)}% (24h)
                </span>
              </div>

              {/* Market Cap */}
              <div className="text-sm text-gray-500">
                Market Cap: {formatPrice(crypto.quote.USD.market_cap)}
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Updated: {formatDate(crypto.last_updated)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CryptoPriceDisplay;