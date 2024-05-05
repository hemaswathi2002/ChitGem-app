const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const goldSchema = new Schema({
    goldPrice: {
        type: Object, 
      },
      timestamp:String,
},{ timestamps: true })

const Gold = model('Gold', goldSchema);

module.exports = Gold;
