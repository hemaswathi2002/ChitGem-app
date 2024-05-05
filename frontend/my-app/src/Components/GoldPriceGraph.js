import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Chart as Chartjs} from 'chart.js/auto'
import { Line, TimeScale } from 'react-chartjs-2';
import "chartjs-adapter-date-fns" 

const GoldPriceGraph = () => {
  const [goldPrices, setGoldPrices] = useState(null);

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        const response = await axios.get('http://localhost:3009/api/goldprice');
        console.log("Golllddldldl",response.data)
        if(response.data.length>0){
          setGoldPrices({
            labels:response.data.map((individualData)=>individualData.goldPrice),
            datasets:[{
              label:'GoldPrice',
              data:response.data.map((individualData)=>individualData.timestamp),
            }]
          });

        }else{
          console.log("No data found")
        }
     
      } catch (error) {
        console.error('Error fetching gold prices:', error);
      }
    };

    fetchGoldPrices();

  }, []);


return(
  <div className="wrapper">
  {goldPrices!==null?(
    <Line data={goldPrices}/>
  ):(
    <div>Gold Price is Null</div>
  )}
  </div>
)
}
export default GoldPriceGraph