import db from "../database/db.js";
 
const list = async (req, res)=>{
 try {
 const products= await db.collection("list").find().toArray();
 res.send(products);
 } catch (error) {
 console.log(error);
 res.sendStatus(500);
 }
}
const listSearch = async (req,res)=>{
 const {search}=req.params 
 try{
 const products = await db.collection("list").find().toArray();
 const filter = products.filter((e)=>(e.name.includes(search)));
 res.send(filter);
 }catch(err){
 res.status(500).send(err.message);
 }
}
export{list, listSearch};