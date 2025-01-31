import React from "react";
import { TrendingUp, TrendingDown, DollarSign, Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/ex";
// Type definitions
interface purity {
  label: string;
  value: number;
}
export interface GoldPrice {
  id: number;
  timestamp: number;
  metal: string;
  currency: string;
  exchange: string;
  symbol: string;
  prev_close_price: number;
  open_price: number;
  low_price: number;
  high_price: number;
  open_time: number;
  price: number;
  ch: number;
  chp: number;
  ask: number;
  bid: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_21k: number;
  price_gram_20k: number;
  price_gram_18k: number;
  price_gram_16k: number;
  price_gram_14k: number;
  price_gram_10k: number;
}
interface gold {
  data: GoldPrice[];
}
const GoldPriceDisplay = ({ data }: gold) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    });
  };
  let purities: purity[] = [];
  const all = [];
  for (const m of data) {
    purities = [
      { label: "24K", value: m.price_gram_24k },
      { label: "22K", value: m.price_gram_22k },
      { label: "18K", value: m.price_gram_18k },
      { label: "14K", value: m.price_gram_14k },
    ];
    all.push(purities);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Price Card */}
      {data.map((metal: GoldPrice) => (
        <Card
          key={metal.metal}
          className="mb-6 bg-gradient-to-br from-yellow-50 to-yellow-100"
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Circle className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl">Gold Price (Troy Ounce)</span>
              </div>
              <span className="text-sm text-gray-500">
                {formatTime(metal.timestamp)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Price */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                  <span className="text-4xl font-bold">
                    {formatPrice(metal.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {metal.chp >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      metal.chp >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metal.chp > 0 ? "+" : ""}
                    {metal.chp}% ({formatPrice(metal.ch)})
                  </span>
                </div>
              </div>

              {/* Market Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Day Range</div>
                  <div className="font-medium">
                    {formatPrice(metal.low_price)} -{" "}
                    {formatPrice(metal.high_price)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Bid/Ask</div>
                  <div className="font-medium">
                    {formatPrice(metal.bid)} / {formatPrice(metal.ask)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Open</div>
                  <div className="font-medium">
                    {formatPrice(metal.open_price)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Prev Close</div>
                  <div className="font-medium">
                    {formatPrice(metal.prev_close_price)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {all.map((pur) =>
          pur.map(({ label, value }) => (
            <Card key={label} className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-600">
                    {label} Gold
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {formatPrice(value)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">per gram</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GoldPriceDisplay;
