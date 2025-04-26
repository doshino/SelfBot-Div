# Selfbot para Interação e Divulgação no Discord

Este projeto é um **selfbot** desenvolvido em Node.js utilizando a biblioteca `discord.js-selfbot-v13` para pegar IDs de usuários em servidores do Discord e mandar mensagens diretamente para esses usuários. Após a resposta de um usuário, ele envia um link de convite.

## Funcionalidades

1. **Pega IDs das DMs com Membros** de servidores em comum.
2. **Cria interação** com os usuários, mandando uma mensagem inicial.
3. Após a resposta do usuário, o bot envia um **link de divulgação**.
4. Limita a quantidade de **DMs criadas**, para evitar sobrecarga e Ban.
5. **Delay inteligente** para parecer humano durante as interações.

## Requisitos

- **Node.js** (v16 ou superior) instalado.
- **Google Chrome** (instalado na sua máquina).
- **ChromeDriver** compatível com a versão do seu Google Chrome.

### Dependências

- **discord.js-selfbot-v13**: Para interagir com o Discord como um selfbot.
- **selenium-webdriver**: Para controlar o navegador e enviar as mensagens evitando captcha.

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Abra o terminal na pasta do projeto.
3. Execute o comando abaixo para instalar as dependências:

```bash
npm install
