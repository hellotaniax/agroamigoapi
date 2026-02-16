# 1. Usar imagen base ligera de Node 20
FROM node:20-alpine

# 2. Instalar dependencias del sistema necesarias para compilar 'bcrypt' nativo
# (Si decides usar solo bcryptjs, podrías quitar esta línea para hacer la imagen más ligera)
RUN apk add --no-cache python3 make g++

# 3. Directorio de trabajo
WORKDIR /app

# 4. Copiar archivos de dependencias
COPY package*.json ./

# 5. Instalar dependencias de Node
RUN npm install

# 6. Copiar el resto del código fuente
COPY . .

# 7. Exponer el puerto (Asegúrate que en tu src/server.js uses process.env.PORT || 3000)
EXPOSE 3000

# 8. Comando de inicio (coincide con tu script "start")
CMD ["npm", "start"]