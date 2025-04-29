const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://shaymabahi330:pclFp33QGh5vr1rR@greenfield.1qcs6ze.mongodb.net/Greenfield?retryWrites=true&w=majority&appName=Greenfield";

mongoose.connect(mongoURI)
.then(() => {
  console.log("db connected");
}).catch((error) => {
  console.error("db connection error:", error);
}); 

const db = mongoose.connection;

module.exports = db; 