import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import cors from 'cors';
import { Sequelize } from 'sequelize';

import User from './models/User';
import database from './db';

const app = express();
const port = 8080

app.use(cors());
app.use(express.json());
app.use(session({
    secret: "secretTeste",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

const testaNull = () => {
    
}

app.post(`/login`, async (req, res) => {

    const { email } = req.body;
    const { senha } = req.body;

    console.log(`a`)

    let testaNull = false
    Object.keys(req.body).forEach((i) => {if(req.body[i] == '' || req.body[i] == undefined || req.body[i] == null) {
        testaNull = true
    }})
    if (testaNull) {
        return res.status(400).json()
    }

    const user = await database.sync().then(async () => {
        const user = await User.findAll({
            where: {
                email: email
            }
        })
        return user
    })

    if (user[0] == undefined | null) {
        res.status(500)
    }

    if(user[0].dataValues.senha !== senha) {
        return res.status(403).json()
    }

    req.session.nome = user[0].dataValues.nome;
    req.session.sobrenome = user[0].dataValues.sobrenome;
    req.session.email = email;
    req.session.senha = senha;
    req.session.nvAcesso = user[0].dataValues.nvAcesso

    console.log(req.session)

    res.status(200).json(JSON.stringify({ 
        'msg': 'Usuario logado',
        'sessionNome': req.session.nome,
        'sessionSobrenome': req.session.sobrenome,
        'sessionEmail': req.session.email,
        'sessionSenha': req.session.senha,
        'sessionnvAcesso': req.session.nvAcesso,
    }))
})

app.post(`/register`, async (req, res) => {
    const date = new Date();
    const current_time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    const { nome } = req.body
    const { sobrenome } = req.body
    const { email } = req.body
    const { senha } = req.body
    const { sexo } = req.body
    const { nascimento } = req.body

    console.log(req.body)

    let testaNull = false
    Object.keys(req.body).forEach((i) => {if(req.body[i] == '' || req.body[i] == undefined || req.body[i] == null) {
        testaNull = true
    }})

    if (testaNull) {
        return res.status(400).json()
    }

    const newUser = await database.sync().then(async () => {
        const newUser = await User.create({
            'nome': nome,
            'sobrenome': sobrenome,
            'email': email,
            'senha': senha,
        })
        return newUser
    })

    if (typeof newUser.dataValues.id != 'number') {
        return res.status(500)
    }

    return res.status(200).json(JSON.stringify({ "msg": `Usuário cadastrado com sucesso` }))
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})