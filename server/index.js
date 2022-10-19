import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import cors from 'cors';
import fs from 'fs'
import bcrypt from 'bcrypt'
import User from './models/User';
import database from './db';
import { decryptObject } from './Criptografia/Criptografia';
// import { buscaAlimento } from './Controllers/Alimentos'

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

app.post(`/login`, async (req, res) => {

    const { cryptedObject } = req.body;

    const trueBody = decryptObject(cryptedObject)

    const { email } = trueBody
    const { senha } = trueBody

    console.log(trueBody)

    let testaNull = false
    Object.keys(trueBody).forEach((i) => {
        if (trueBody[i] == '' || trueBody[i] == undefined || trueBody[i] == null) {
            testaNull = true
        }
    })

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
        res.status(500).json()
    }

    if (await bcrypt.compare(senha, user[0].dataValues.senha).then(function(result) {
        return result
    })) {
        return res.status(403).json({ msgError: 'Usuário ou senha incorretos' })
    }

    req.session.nome = user[0].dataValues.nome;
    req.session.sobrenome = user[0].dataValues.sobrenome;
    req.session.email = email;
    req.session.senha = senha;
    req.session.nvAcesso = user[0].dataValues.nvAcesso

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

    if(!req.body.cryptedBody || typeof req.body.cryptedBody != 'string') {
        return res.status(400).json({msgError: "Ocorreu um erro no cadastro, tente novamente mais tarde"})
    }

    const trueBody = decryptObject(req.body.cryptedBody)

    const { nome } = trueBody
    const { sobrenome } = trueBody
    const { email } = trueBody
    const { senha } = trueBody
    const { sexo } = trueBody
    const { nascimento } = trueBody

    console.log(trueBody)

    let testaNull = false
    Object.keys(trueBody).forEach((i) => {
        if (trueBody[i] == '' || trueBody[i] == undefined || trueBody[i] == null) {
            testaNull = true
        }
    })

    if (testaNull) {
        return res.status(400).json({msgError: "Preencha todos os campos"})
    }

    const user = await database.sync().then(async () => {
        const user = await User.findAll({
            where: {
                email: email
            }
        })
        return user
    })

    if(user.length > 0) {
        return res.status(400).json({msgError: "Este e-mail já está sendo utilizado"})
    }

    try {
        const newUser = await database.sync().then(async () => {
            const newUser = await User.create({
                'nome': nome,
                'sobrenome': sobrenome,
                'email': email,
                'senha': await bcrypt.hash(senha, 10).then(function(hash) {
                    return hash
                }),
                'sexo': sexo
            })
            return newUser
        })
        return res.status(200).json(JSON.stringify({ "msg": `Usuário cadastrado com sucesso` }))

    } catch (err) {
        return res.status(500).json(JSON.stringify({ "msgError": `Erro ao cadastrar. Tente novamente mais tarde` }))
    }

})

app.get('/alimento/:nameAlimento', async (req, res) => {
    const { nameAlimento } = req.params

    if (nameAlimento == '' || nameAlimento == undefined || nameAlimento == null) {
        return res.status(400).json()
    }

    const listaAlimentosJSON = fs.readFileSync('./AlimentosData/AlimentosLista.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ msg: err })
        }
        return data
    })

    const listaAlimentos = JSON.parse(listaAlimentosJSON)

    const resultado = listaAlimentos.filter(e => {
        if (e.description.toLowerCase().replace(/, /g, ` `).includes(nameAlimento.toLowerCase())) {
            return e
        }
    });

    return res.status(200).json(JSON.stringify(resultado))


})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})