import db from "../database/db.js";
import {ObjectId} from "mongodb"; 
 
const addList=  (req,res)=>{

  const {name,image,value}=req.body;
  const nameLower=name.toLowerCase()
  try{
  db.collection("list").insert({nameLower,image,value});
  res.status(201).send({nameLower,image,value});
   }catch (err){
  console.log(err)
  res.sendStatus(500);
   }
  }
const delList= async(req,res)=>{
 const {id}=req.body;
 try{
 const del = await db.collection("list").delete({  });
 res.send(del);
 }catch(err){
 res.send(err.message);
 }
};
export{addList,delList};