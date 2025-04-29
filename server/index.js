const express = require("express");
const cors = require('cors');
const cookieparser = require('cookie-parser')

const app = express();
 
const db = require("./database/index.js");  // Import database connection
const Router = require('./routes/routers.js')
const userrouter = require('./routes/userroutes.js')
const recRoutes =require('./routes/rec.js')

const PORT = process.env.PORT || 5500;

app.use(cors({
  origin: ["http://localhost:3000"],  
  // credentials: true //// d'ont touch that...
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/',Router)
app.use('/',userrouter)
app.use('/',recRoutes)

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
