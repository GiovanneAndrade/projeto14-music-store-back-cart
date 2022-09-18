import express from 'express';
import { loginAccount, signUpAccount } from '../controllers/auth.controller.js';
import { cartOrder } from '../controllers/cart.controller.js'
import {  list,listSearch } from '../controllers/list.controller.js';
import { addList, delList } from '../controllers/add.del.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signUpAccount);
authRouter.post('/login', loginAccount);
authRouter.post('/cart', cartOrder);
authRouter.get('/list',list);
authRouter.get('/list/:search',listSearch);
authRouter.post("/list-add",addList);
authRouter.delete("/list-del",delList);
export { authRouter };