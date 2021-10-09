const mongoose = require('mongoose');
const db = mongoose.connection;
require('dotenv').config();

function connectDB(){
   mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   });
   
   db.on('open', _ => {
       console.log('Database connected');
   });

   db.on('error', err => {
       console.log(err);
   });
}

connectDB();