Projeto 

1 -intall npx create-app-react
2 - install json-server
3 - install react-icons

Logo em seguida ir em package-json e instalar a dependencia do json-server (ficticio);
Watch => significa monitornado a API ficticia
port => porta em que vai rodar a API
data => pasta criada para inserir o db.json
db.json => arquivo criado para imitar uma API

"server": "json-server --watch data/db.json --port 5000"

Criado um array vazio para manipular com create,read,update,delete
"todos":[]

Logo em seguida usa-se o comando no terminal para rodar a API
npm run server
npm start

Iniciando com exclusão de algumas coisas não utilizaveis como os elementos no functions APP e index.css e app.css

Depois cria-se os imports da biblioteca do React;
import {useState, useEffect} from 'react';

onChange={(e) => setTitle(e.target.value)}
colocando no title o valor desse input;

OBS: Caso haja um erro da função onChange, onClick, etc; recarrega a página e some;
Caso haja um erro de value input é só colocar este código;
value={title || ""}

API INTEGRAÇÃO REACT
========================
Async => função de aguardar assíncrona
Await => espera resposta do servidor e depois manda de volta "Fecth"
headers => cabeçalho
body => corpo da requisição
JSON.Stringify => manda como uma string para que o Back-end entenda para converter em objeto;


AO RODAR O PROJETO DEVE-SE PRIMEIRO EFETUAR OS COMANDOS:
npm start
npm run dev