const mongoose = require('mongoose');

//insert password : sG4v5V0UAthMun5y
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('Mongoose Connected...')
    }).catch((err)=>{
        console.log("MongDB Connection Error : ",err);
    })