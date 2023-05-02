// config inicial
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Aluno = require('./models/Aluno')

// forma de ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 

// rota inicial / end point
app.get('/', (req,res) => {
res.json({message: "oi, express!"})
})

app.post('/aluno',async (req,res) => {
    const {nome, sobrenome, idade} = req.body
    const aluno = {
        nome,
        sobrenome,
        idade
    }

    await Aluno.create(aluno)
    res.status(200).json({message: "Aluno inserido com sucesso!"})
})

app.get("/aluno", async (req,res) => {
    const alunos = await Aluno.find()
    res.status(200).json(alunos)
})

app.delete('/aluno/:id', async (req,res) => {
    try {

        const id = req.params.id
        const aluno = await Aluno.findOne(
            {
                _id: id
            }
        )
        if(aluno === null){
            res.status(404).json({message: "Aluno não encontrado"})
            return
        }
        await Aluno.deleteOne({_id: id})
        res.status(200).json({message: "Aluno deletado"})
    } catch (error) {
        res.status(500).json({ erro: error })
      }
})

app.put('/aluno/:id', async (req,res) => {
    const id = req.params.id
    const aluno = await Aluno.findOne(
        {
            _id: id
        }
    )
    if(aluno === null){
        res.status(404).json({message: "Aluno não encontrado"})
        return
    }
    const {nome, sobrenome, idade} = req.body
    const alunoUpdate = {
        nome,
        sobrenome,
        idade,
    }
    await Aluno.updateOne({_id: id},alunoUpdate)

    res.status(200).json({message: "aluno alterado"})
    
})


mongoose
  .connect('mongodb+srv://projeto-crud:123@cluster0.uvcnjzi.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))