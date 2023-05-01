const mongoose = require('mongoose');

const aluno = mongoose.model('Aluno', {
    nome: String,
    sobrenome: String,
    idade: Number
})

module.exports = aluno;