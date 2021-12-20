const express = require('express')
const mongoose = require('mongoose')
const UserCollection = require('./UserSchema')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.lpmpa.mongodb.net/note-tuts?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( result=> console.log('Mongodb connected '))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
  })

          
                              //   TASK 1  //

app.get('/studentdetails', async(req, res) => {
    var Class = req.body.Class
    await UserCollection.find( {Class : Class} )
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.log(err)
      })
  })

  app.post('/studentdetails', async(req, res) => {
    const  Name = req.body.Name
    const AdmissionNumber = req.body.AdmissionNumber
    const Class = req.body.Class
    const Marks = req.body.Marks
    const Feedback   = req.body.Feedback
    const createdUser = new UserCollection({ Name ,AdmissionNumber ,Class ,Marks, Feedback })
    await createdUser.save()
    res.json({
      data: createdUser
     })
  })


  app.delete('/studentdetails', (request, response) => {
      UserCollection.deleteMany({}, function(err) {
        if (err) {
            response.status(500).send({error: "Could not clear database..."});           
        } else {
            response.status(200).send({message: "All info was deleted succesfully..."});
        }
    });
});


                     //   TASK 2   //
  // To find single Student data by Id
app.get('/studentdetails/:userId', async(req, res) => {
    const userId = req.params.userId
    console.log(userId)
    const user = await UserCollection.findById(userId);

    UserCollection.findById(userId)
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


  app.post('/studentdetails/:userId', async(req, res) => {
    const userId = req.params.userId
    const Name = req.body.Name
    const AdmissionNumber = req.body.AdmissionNumber
    const Class = req.body.Class
    const Marks = req.body.Marks
    const Feedback   = req.body.Feedback
    const createdUser = new UserCollection({ Name ,AdmissionNumber ,Class ,Marks, Feedback })
    await createdUser.save()
    res.json({
      data: createdUser
     })
  })


  app.delete('/studentdetails/:userId', async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await  UserCollection.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }
  )


  app.put('/studentdetails/:userId' ,async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId
     await UserCollection.findByIdAndUpdate(userId, update)
     const user = await UserCollection.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   })


                          //  TASK 3    //
app.get('/studentdetails/:userId/Feedback', async(req, res) => {
    const userId = req.params.userId
    console.log(userId)
    const user = await UserCollection.find({_id : userId},{Feedback:1})
     console.log("feedbackuser is :"+user)

    await UserCollection.find({_id : userId},{Feedback:1})
    .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.log(err)
      })
  })


app.post('/studentdetails/:userId/Feedback', async(req, res) => {
 
    try {
        const update = req.body
        const userId = req.params.userId;
        await UserCollection.findByIdAndUpdate(userId, update)
        res.status(200).json({
         message: 'Post successfull'
        });
       } catch (error) {
        next(error)
       }
  })


app.delete('/studentdetails/:userId/Feedback', async(req, res) => {
 
    try {
        const update = req.body
        const userId = req.params.userId
        await UserCollection.updateOne({_id :userId},{ $unset: { Feedback : ""} })
        res.status(200).json({
         message: 'Post successfull'
        });
       } catch (error) {
        next(error)
       }
  })



                        //   TASK 3.1       //
app.get('/studentdetails/:userId/Feedback/:feedbackId', async(req, res) => {    
    const feedbackId =req.params.feedbackId
    const user = await UserCollection.findOne({ 'Feedback._id': feedbackId},{Feedback:1})
    await UserCollection.findOne({ 'Feedback._id': feedbackId},{Feedback:1})
    .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.log(err)
      })
  })
    

  app.post('/studentdetails/:userId/Feedback/:feedbackId', async(req, res,next) => {
 
    try {
        const update = req.body
        const userId = req.params.userId;
        await UserCollection.findByIdAndUpdate(userId, update)
        res.status(200).json({
         message: 'Post successfull'
        });
       }
        catch (error) {
        next(error)
       }

  })


  app.put('/studentdetails/:userId/Feedback/:feedbackId', async(req, res) => {
 
    try {
        const update = req.body
        const userId = req.params.userId;
        await UserCollection.findByIdAndUpdate(userId, update)
        res.status(200).json({
        
         message: 'Post successfull'
        });
       } catch (error) {
        next(error)
       }
  })


                       //  TASK 3.2   //
app.delete('/studentdetails/:userId/Feedback/:feedbackId', async(req, res,next) => {
 
    try {
        const feedback = req.body.Feedback
        const StarRating = req.body.StarRating
        const userId = req.params.userId;
        console.log(userId)
        const user = await UserCollection.updateMany( { }, { $pull: { Feedback: { StarRating : 7 } } }  )
        //await UserCollection.updateOne({StarRating : 7},{$pull : { children : { StarRating : 7 }}})
        res.status(200).json({
         data : user,
         message: 'Delete successfull'
        });
       }
        catch (error) {
        next(error)
       }
  })