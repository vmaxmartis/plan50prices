import axios from "axios";

export const fetchAPI_XAU = async () => {

const apiKey = "dea02cd4fbc047dba8d0507fe2b3f0a1";
const interval = "1min";
  try {
    //  const response = await axios.request({
    //    method: "GET",
    //    url: "https://trend-and-strength-api-for-forex-gold-xauusd.p.rapidapi.com/XAUUSD",
    //    headers: {
    //      "X-RapidAPI-Key": "5ecf4550ddmshda162bd15f26f59p10ca39jsn5b5c793d22aa",
    //      "X-RapidAPI-Host":
    //        "trend-and-strength-api-for-forex-gold-xauusd.p.rapidapi.com",
    //    },
    //  });
   //  const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
   //    headers: {
   //      "x-access-token": "goldapi-vf9uoslu9hfw4x-io",
   //      "Content-Type": "application/json",
   //    },
     //  });
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?apikey=dea02cd4fbc047dba8d0507fe2b3f0a1&interval=5min&format=JSON&symbol=XAU/USD`
      );
      console.log('response:', response);
   
    return response;
  } catch (error) {
    console.error(error);
  }
};
