

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { type} = await req.json();
  

  if (!type) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
// Currency symbols and colors mapping
const res = {
    'USD': { symbol: '$', name: 'United States Dollar' },
    'EUR': { symbol: '€', name: 'Euro' },
    'GBP': { symbol: '£', name: 'British pound sterling' },
    'BTC': { symbol: '₿', name: 'Bitcoin' },
    'ETH': { symbol: 'Ξ', name: 'Ethereum' },
    'USDT': { symbol: '₮', name: 'Tether' },
    'SAR': { symbol: 'ر.س', name: 'Saudi Riyal' },
    'AED': { symbol: 'أ.د', name: 'UAE Dirham' },
    'EGP': { symbol:'ج.م', name: 'Egyptian Pound' },
    'KWD': { symbol:'ك.د', name: 'Kuwaiti Dinar' },
    'QAR': { symbol:'ر.ق', name: 'Qatar' },
    'OMR': { symbol:'ر.ع', name: 'Omani Rial' },
    'BHD': { symbol:'د.ب', name: 'Bahraini Dinar' },
    'JOD': { symbol:'د.أ', name: 'Jordanian Dinar' },
    'TRY': { symbol:'₮', name: 'Turkish Lira' },
    'GOLD': { symbol: '₯', name: 'Gold' },
    'SILVER': { symbol: 'Ag', name: 'Silver' },
  };

  
  
  console.log(res);
  if (res) 
    return NextResponse.json({ ok: true,currencies:res}, { status: 200 });
  return NextResponse.json({ message: "Error Fetching Assistants"}, { status: 500 });
}

export { handler as POST, handler as GET };
