import app from "./src/app.js";
import connectToDB from "./src/config/db.js";



connectToDB()

app.listen(8000,()=>{
    console.log(`Server is Listening to Port 8000`)
})