"use server";

import axios from "axios";


// GoldAPI

export async function getGoldPrices(){
 const metals = []
 const m = ['XAU']
 let d = 0;
 let data;
 for (const i of m) {
  const requestOptions = {
    url:`https://www.goldapi.io/api/${i}/USD`,
    method: 'GET',
    headers:  {"Content-Type": 'application/json', "x-access-token": process.env.GOLD_API_KEY },
  };

  const res = await axios.request(requestOptions);
  if (res.status==200) {
 // console.log(res.data)
  data = res.data;
  data['id'] = d;
  d = d+1;
  metals.push(data)}
 
}
console.log(metals)
return metals
}

export async function getCoins() {
  const options = {
    method: 'GET',
    //url: `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
    headers: {accept: 'application/json', 'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY}
    , params:{limit: 30}
  };
const res = await axios.request(options);
if (res.status==200) {
  //console.log(res.data['data'].length)
  console.log(res.data['data'][0])
  return res.data['data']
}
else {
  console.log(res.status)
  return []
}
   
}


