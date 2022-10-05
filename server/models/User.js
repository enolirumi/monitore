import { Sequelize, DataTypes } from "sequelize";
import database from '../db'

const User = database.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    nvAcesso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    },
    nascimento: {
        type: DataTypes.TIME
    },
    exercicioFisico: {
        type: DataTypes.BOOLEAN
    },
    frequenciaExercicios: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.FLOAT
    },
    tipoDiabetes: {
        type: DataTypes.INTEGER
    },
    sexo: {
        type: DataTypes.CHAR(1)
    },
    altura: {
        type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.BOOLEAN
    }
})

export default User