import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static("frontend"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("frontend/index.html"));
});



// acessar o frontend sem precisar rodar o frentend separadamente

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar usuário", details: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar usuário", details: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar usuário", details: error.message });
    }
});


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});