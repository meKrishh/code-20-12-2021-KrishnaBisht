const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BmiValueSchema = new Schema({
    BmiValue: {
     type: Number
    },
    BmiCategory: {
     type: String
    },
    HealthRisk:{
     type : String
    }
   })
   
   const Bmi = mongoose.model('bmi', BmiValueSchema)
   module.exports = Bmi