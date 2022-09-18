//import Joi from 'joi';
import db from '../database/db.js'
import dayjs from "dayjs";
const day = dayjs().format('DD/MM')
const time = dayjs().format("HH:mm:ss")
let dayTime = `${day} - ${time}`
async function cartOrder(req, res) {
  const { authorization, name, email} = req.headers
  
  const token = authorization?.replace("Bearer", "");
  let tokenValidation =  await db.collection("sessions").find({ token }).toArray()
  let teste =  await db.collection("order").find({  }).toArray()
   console.log(teste.slice(-15))
 /*  if (!tokenValidation.length) {
    res.status(401).send('Faça Login')
    return;
  } */  
 try {
 await db.collection('order').insertOne({
  ...{ dayTime },
    ...req.body
  })
  res.send(200)
 } catch (error) {

  res.status(500).send(error.message)
 }
}
export { cartOrder }; 