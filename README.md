```javascript
 ___       ________  ___  ___  _________  ___  ___
|\  \     |\   __  \|\  \|\  \|\___   ___\\  \|\  \
\ \  \    \ \  \|\  \ \  \\\  \|___ \  \_\ \  \\\  \
 \ \  \    \ \   __  \ \  \\\  \   \ \  \ \ \   __  \
  \ \  \____\ \  \ \  \ \  \\\  \   \ \  \ \ \  \ \  \
   \ \_______\ \__\ \__\ \_______\   \ \__\ \ \__\ \__\
    \|_______|\|__|\|__|\|_______|    \|__|  \|__|\|__|
                  _______________________
                  ___    |__  __ \___  _/
                  __  /| |_  /_/ /__  /
                  _  ___ |  ____/__/ /
                  /_/  |_/_/     /___/

Aplicação back-end - API de autenticação lance-auth-api
```

![](https://img.shields.io/badge/versão-1.1.0-blue)
![](https://img.shields.io/badge/cobertura_de_testes-99.19%25-olive)
![](https://img.shields.io/badge/build-ok-green)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=Zod&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black)
![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

# Auth API

A api de autenticação do lance! é uma api responsável, justamente com o firebase, pela validação de sessões e criação de tokens de acesso, e o gerenciamento de preferências de usuário, persistidos em uma tabela do AWS DynamoDB.

## Instalação

Para instalação do projeto na sua máquina, digite os comandos no terminal:

```console
git clone git@bitbucket.org:lanceweb/auth-api.git
```

```console
cd auth-api
```

```console
npm i
```

Após isso, você pode abrir o diretório `/auth-api` no seu editor favorito.

## Rodando localmente

Para rodar o projeto localmente na sua máquina, digite o seguinte comando no terminal:

```console
npm run dev
```

## Utilização

Rotas disponíveis:

### 1. **POST /api/token**

- Valida um `authorization_token` (token de autorização) e retorna um `access_token` (token de acesso).
- Corpo da requisição:

  ```json
  {
    "authorization_token": "string"
  }
  ```

- Resposta:

  ```json
  {
    "access_token": "string"
  }
  ```

### 2. **POST /api/users/user/preferences**

- Cria preferências para um usuário.
- Header Authorization: `authorization_token` de usuário.
- Corpo da requisição:

  ```json
  {
    "team": "string",
    "termsAccepted": true,
    "newsletterAccepted": true
  }
  ```

- Resposta:

  ```json
  {
    "team": "string",
    "uid": "string",
    "termsAccepted": true,
    "newsletterAccepted": true
  }
  ```

### 3. **PUT /api/users/user/preferences**

- Atualiza as preferências de um usuário.
- Header Authorization: `authorization_token` de usuário.
- Corpo da requisição:

  ```json
  {
    "team": "string",
    "termsAccepted": true,
    "newsletterAccepted": true
  }
  ```

- Resposta: `204` No Content.

### 4. **GET /api/users/user/preferences**

- Retorna as preferências de um usuário.
- Header Authorization: `authorization_token` de usuário.
- Resposta:

  ```json
  {
    "team": "string",
    "uid": "string",
    "termsAccepted": true,
    "newsletterAccepted": true
  }
  ```
