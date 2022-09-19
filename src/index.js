import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
//import { cartRouter } from './routes/cart.routes.js';
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
//app.use(cartRouter);


app.listen(port, () => console.log("Ouvindo"));
