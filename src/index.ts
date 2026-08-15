import express from "express";
import  routeur from "./Route/studentRoute";
import dotenv from "dotenv";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;;

app.use(express.json());

app.use('/students',routeur)
app.listen(PORT,()=>{
    console.log(`Serveur demarre sur http://localhost:${PORT}`)
})