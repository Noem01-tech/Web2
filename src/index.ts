import express from "express";
import{studentController} from './controller/studentController';

const app=express();
const PORT= 3000;


app.use('/')
app.listen(PORT)