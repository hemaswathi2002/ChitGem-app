import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Chart as Chartjs} from 'chart.js/auto'

import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-annotation'

const GoldPriceGraph = () => {
  const [goldPrices, setGoldPrices] = useState(null)
  console.log(goldPrices)

  useEffect(() => {
    const fetchGoldPrices = async () => {
      // try {
      //   const response = await axios.get('http://localhost:3009/api/goldprice')
      //   console.log("Gold Prices Data:", response.data)
      //   if (response.data.length > 0) {
      //     const formattedData = {
      //       labels: response.data.map((individualData) => formatDate(individualData.timestamp)),
      //       datasets: [{
      //         label: 'Gold Price',
      //         data: response.data.map((individualData) => individualData.goldPrice),
      //         borderColor: 'lightblue',
      //       }]
      //     }
      //     setGoldPrices(formattedData)
      //   } else {
      //     console.log("No data found")
      //   }
      // } catch (error) {
      //   console.error('Error fetching gold prices:', error)
      // }
    }

    fetchGoldPrices()

    const interval = setInterval(fetchGoldPrices)

    fetchGoldPrices()

    return () => clearInterval(interval)
  }, [])

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000) 
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }
  const options = {
    scales: {
      x: {
        ticks: {
          color: 'darktblue', 
        },
      },
      y: {
        ticks: {
          color: 'darktblue',
        },
      },
    },
  }

  return (
    <div className="wrapper" style = {{paddingTop : '90px'}}>
      {goldPrices !== null ? (
        <Line data={goldPrices}options={options} />
      ) : (
        <div>Gold Price Data is Null</div>
      )}
    </div>
  )
}

export default GoldPriceGraph
