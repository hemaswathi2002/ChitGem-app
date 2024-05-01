
const Invoice = require('../models/invoice-model')

const invoiceController = {}

invoiceController.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
        .populate('customer', 'customerName')
        .populate('chit', 'totalAmount')
        res.status(200).json(invoices)

    res.status(200).json(invoices)
    } catch (error) {
        console.error('Error fetching invoices:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = invoiceController
