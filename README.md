# node_task_manager
API REST Lista de Tarefas com autenticação com facebook.

## Pré requisitos
- Node v10.16 LTS [Baixar](https://nodejs.org/en/)
- MongoDB Community Server [Baixar](https://www.mongodb.com/download-center/community)

## Executando a aplicação
Instale os pacotes
> npm install

Rodando
> npm start 
> npm run start-local

## Ferramentas
- Postman [Baixar](https://www.getpostman.com/downloads/)
- VS Code [Baixar](https://code.visualstudio.com/)

## Rotas
### Usuários
|Method|Rota|Descrição|
|-|-|-|
|GET | /users | 
|POST |/users |
|GET |  /users/:user_id |
|PUT |  /users/:user_id |
|POST | /users/forgot_password| 
|POST | /users/authenticate |
|GET | /users/email/:email |

### Usuarios Payloads
- POST /users
    ~~~json 
    {
        "name": "teste",
        "avatar": "",
        "email": "teste@teste.com",
        "password": "teste12345"
    }
    ~~~

- PUT /users/:user_id
    ~~~json 
    {
        "name": "teste",
        "avatar": "",
        "email": "teste@teste.com",
        "password": "teste12345"
    }
    ~~~

- POST /users/authenticate
    ~~~json 
    {
        "email": "teste@teste.com",
        "password": "teste12345"
    }
    ~~~

## Referências
- Install Mongo on Windows [Ver Artigo](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)
- REST Api node (Express and Mongo) [Ver Artigo](https://medium.com/@thiagoluiz.nunes/rest-api-com-node-js-express-and-mongodb-3967c2cb25b7)
- Aplicação Restful Node, Express com MongoDB [Ver Artigo](https://code4coders.wordpress.com/2016/10/14/desenvolvendo-uma-aplicacao-restful-api-em-node-js-express-js-com-mongodb/) 
- Mongoose API [Ver Documentação](https://mongoosejs.com/docs/api.html)
- Node + Mongo + Express [Ver Artigo](https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/)

## Equipe
- [zballos](https://github.com/zballos)
- Lucas
- Rodrigo

