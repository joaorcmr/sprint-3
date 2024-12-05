FROM node:18-alpine

# Cria diretório na imagem
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "start:prod"]
