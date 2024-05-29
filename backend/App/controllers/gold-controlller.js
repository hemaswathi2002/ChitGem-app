const axios = require('axios')
const Gold = require('../models/gold-model')

const goldController = {}

goldController.get = async (req, res) => {
    try {
        // const apiKey = process.env.GOLD_API_KEY
        // const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
        //     headers: {
        //         'x-access-token': apiKey
        //     },
        // })
        // const goldPrice = response.data.price_gram_24k
        // const timestamp =  response.data.timestamp

        // const goldDocument = new Gold({ goldPrice: goldPrice, timestamp: timestamp })
        // await goldDocument.save()

        // const allGoldRecords = await Gold.find()

        // res.json(allGoldRecords)
    } catch (error) {
        console.error('Error fetching live gold price:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = goldController
