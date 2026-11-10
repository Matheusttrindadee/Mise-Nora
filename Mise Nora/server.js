// Importa o Express (framework para criar o servidor) e o Cors (para permitir a comunicação)
const express = require('express');
const cors = require('cors');

const app = express();

// Configura o servidor para entender dados em formato JSON
app.use(express.json());
app.use(cors());

// "Banco de dados" temporário em memória (para guardar os dados enquanto o servidor estiver ligado)
const usuarios = [];
const pedidos = [];

// 1. Rota para cadastrar o cliente
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Salva o usuário no nosso "banco" simulado
    usuarios.push({ nome, email, senha });
    console.log('Cliente cadastrado com sucesso:', email);
    
    res.json({ sucesso: true, mensagem: 'Cadastro realizado com sucesso!' });
});

// 2. Rota para fazer o login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Procura o usuário na lista
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        res.json({ 
            sucesso: true, 
            mensagem: 'Login bem-sucedido!', 
            usuario: { nome: usuario.nome, email: usuario.email } 
        });
    } else {
        res.json({ sucesso: false, mensagem: 'E-mail ou senha incorretos.' });
    }
});

// 3. Rota para receber o pedido do carrinho
app.post('/api/pedidos', (req, res) => {
    const { email, itens } = req.body;
    
    // Salva o pedido
    pedidos.push({ email, itens, dataHora: new Date() });
    console.log('Novo pedido recebido de:', email, itens);
    
    res.json({ sucesso: true, mensagem: 'Pedido enviado para o servidor com sucesso!' });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor Node.js rodando na porta 3000...');
});