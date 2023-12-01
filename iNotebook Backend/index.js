const connectToMongo=require('./db')
const express=require('express')
var cors = require('cors')
const auth=require("./routes/auth")
const notes=require("./routes/notes")

connectToMongo();
const port=3000;
const app=express();

app.use(cors())
app.use(express.json())


// Available Routes
app.use("/api/auth",auth);
app.use("/api/notes",notes);





app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);

})



