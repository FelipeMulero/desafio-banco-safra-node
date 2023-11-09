# Use uma imagem base do Node.js
FROM node:latest

# Crie e defina o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copie os arquivos necessários para o diretório de trabalho na imagem
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho na imagem
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
