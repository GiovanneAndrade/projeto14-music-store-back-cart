import bcrypt from 'bcrypt';
import Joi from 'joi';
import db from '../database/db.js'
import { v4 as uuid } from 'uuid';

async function signUpAccount(req, res) {
    const { name, email, password, repeatPassword, cardNumber } = req.body;
    try {
        const emailCheck = await db.collection('users').findOne({ email: email });
        if (emailCheck) { return res.status(409).send('Já existe uma conta com esse email!') };
        if (password !== repeatPassword) { return res.status(422).send('Repetição de password falhou!') };

        const passwordHash = bcrypt.hashSync(password, 10);
        const schema = Joi.object({
            name: Joi.string().min(1).required().trim(),
        })
        const validate = await schema.validateAsync({ name });
        await db.collection('users').insertOne({
            name, email, password: passwordHash, cardNumber
        });
    } catch (error) {
        return res.sendStatus(422);
    }
}

async function loginAccount(req, res) {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({
            email: email
        })
        if ((!user) || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).send('Usuário ou senha não encontrados!');
        }
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })
        user.token = token;
        await db.collection('users').updateOne({ _id: user._id }, { $set: user });
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.send(500);
    }
}

export { signUpAccount, loginAccount };