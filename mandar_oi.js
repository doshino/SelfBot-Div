const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

const token = 'token';

(async function main() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://discord.com/login');

   
        await driver.executeScript(`
            function login(token) {
                setInterval(() => {
                    document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = \`"\${token}"\`
                }, 50);
                setTimeout(() => {
                    location.reload();
                }, 2500);
            }
            login("${token}");
        `);

        console.log('✅ Login automático feito! Esperando carregar...');

        await driver.sleep(8000); 

        const ids = fs.readFileSync('ids.txt', 'utf8').split('\n').filter(Boolean);

        for (let id of ids) {
            try {
                await driver.get(`https://discord.com/channels/@me/${id}`);
                await driver.wait(until.elementLocated(By.css('div[role="textbox"]')), 10000);
                let textbox = await driver.findElement(By.css('div[role="textbox"]'));
                await textbox.sendKeys('Oi, tudo bem??\n');
                console.log(`💬 Mensagem enviada para ${id}`);
                await new Promise(r => setTimeout(r, 10000)); 
            } catch (err) {
                console.error(`⚠️ Erro ao enviar para ${id}:`, err);
            }
        }

        console.log('✅ Fim do envio de mensagens.');
        await driver.quit();
    } catch (err) {
        console.error(err);
        await driver.quit();
    }
})();
