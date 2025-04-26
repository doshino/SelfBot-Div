const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');

const token = 'token';

const client = new Client();

const limiteDeDms = 25; 
let dmsCriadas = 0;  

client.on('ready', async () => {
    console.log(`✅ Logado como ${client.user.tag}`);

    let ids = new Set();

    for (const guild of client.guilds.cache.values()) {
        if (dmsCriadas >= limiteDeDms) {
            console.log(`🚨 Limite de DMs (${limiteDeDms}) atingido! Parando criação de DMs.`);
            break;
        }

        try {
            const members = await guild.members.fetch();
            for (const member of members.values()) {
                if (!member.user.bot && member.user.id !== client.user.id) {
                    if (dmsCriadas >= limiteDeDms) {
                        console.log(`🚨 Limite de DMs (${limiteDeDms}) atingido! Parando criação de DMs.`);
                        break;
                    }
                    try {
                        const dm = await member.user.createDM();
                        ids.add(dm.id); 
                        dmsCriadas++; 
                        console.log(`💬 DM criada com ${member.user.tag} (Total de DMs: ${dmsCriadas})`);
                    } catch (e) {
                        console.error(`Erro ao criar DM com ${member.user.tag}:`, e);
                    }
                }
            }
        } catch (e) {
            console.error(`Erro no servidor ${guild.name}:`, e);
        }

        if (dmsCriadas >= limiteDeDms) {
            console.log(`🚨 Limite de DMs (${limiteDeDms}) atingido! Parando criação de DMs.`);
            break;
        }
    }

    fs.writeFileSync('ids.txt', Array.from(ids).join('\n'));
    console.log(`💾 IDs das DMs salvos no arquivo ids.txt (${ids.size} DMs).`);
    process.exit();
});

client.login(token);
