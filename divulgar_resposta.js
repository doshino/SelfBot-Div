const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');

const token = 'token';

const mensagemDivulgacao = `
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
Coloque sua mensagem aqui
`;

const enviadosFile = 'enviados.txt';
if (!fs.existsSync(enviadosFile)) fs.writeFileSync(enviadosFile, '');

let enviados = new Set(fs.readFileSync(enviadosFile, 'utf8').split('\n').filter(Boolean));

const client = new Client();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('messageCreate', async (message) => {
    if (message.channel.type === 1 && !message.author.bot) {
        const userId = message.author.id;

        if (enviados.has(userId)) {
            console.log(`🔁 Já foi enviado para ${message.author.tag}, ignorando...`);
            return;
        }

        try {
            const tempo = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            console.log(`⌛ Esperando ${tempo / 1000}s para responder ${message.author.tag}...`);
            await delay(tempo);

            await message.channel.send(mensagemDivulgacao);
            console.log(`📨 Mensagem enviada para ${message.author.tag}`);

            enviados.add(userId);
            fs.appendFileSync(enviadosFile, userId + '\n');
        } catch (err) {
            console.error(`❌ Erro ao enviar para ${message.author.tag}:`, err);
        }
    }
});

client.login(token);
