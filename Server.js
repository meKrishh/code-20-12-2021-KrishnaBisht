//importing modules
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose')
const Bmi = require('./Models/Bmi')  //To import Bmi Schema
const app = express();
const PORT = process.env.PORT || 3001
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.lpmpa.mongodb.net/note-tuts?retryWrites=true&w=majority'


//To connect to MongoDb Atlas cloud Database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( result=> console.log('Mongodb connected '))
  .catch(err => console.log(err))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());


           //  TASK1 : To Calculate the BMI , BMI Category and Health Risk  //
app.post("/bmicalculator", function (req, res,error) {
    try{
        var tables = req.body ;
        tables.forEach(function(table) {
            var Height = parseFloat(table.HeightCm);
            var Weight = parseFloat(table.WeightKg);
            var bmi = parseFloat(Weight / (Height*Height))*10000;
            var BmiCategory;
            var HealthRisk;
        
        // CONDITION FOR BMI
        if (bmi<= 18.4) {
            BmiCategory=  "Underweight"  
            HealthRisk= 'Malnutrition risk' 
        } else if (18.5 <= bmi && bmi <= 24.9) {
            BmiCategory='Normal weight'
            HealthRisk= 'Low risk'
        } else if (25 <= bmi && bmi <= 29.9) {
            BmiCategory= 'Overweight'
            HealthRisk= 'Enhanced risk'
        } else if(30<= bmi && bmi<= 34.9) {
            BmiCategory= 'Moderately obese'
            HealthRisk= 'Medium risk'
        }
        else if(35<= bmi && bmi<= 39.9) {
            BmiCategory = 'Severely obese'
            HealthRisk= 'High'
        }
        else if(bmi >=40) {
            BmiCategory = 'Very severely obese'
            HealthRisk= 'Very high risk'
        }
       
        var BmiValue = bmi
        const createdUser = new Bmi({ BmiValue ,BmiCategory,HealthRisk })  //To add them as 3 new columns 
        createdUser.save()    // To save in mongodb Atlas cloud database
    });
    }

    catch (error) {
        next(error)
       }    
    
});
   

          //   TASK2 : Returns Count of the total number of overweight people  //
app.get("/bmicalculator", function (req, res,error) {
   
    try{
        Bmi.find( { BmiValue : { '$gte' : 25 , '$lte' : 29.9 } } ).exec(function (err, results) {
        if (err) { return handleError(err) }
        else
        {
            var count = "Count of the total number of overweight people is :    "+results.length
            res.json({
                data: count
               })
        }
         });
       }
  
      catch (error) {
        next(error)
       }
   
});


//this is used to listen a specific port!
app.listen(PORT, function () {
	console.log("port active at : "+PORT);
});
