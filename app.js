const express = require('express');
const db = require('mysql2');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

const conn = db.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user:"root",
    password: "Dev123456",
    database: "tcc_my_questions",
    insecureAuth : true
});

app.get('/', function(req, res){
    res.send('API ONLINE')
});

    
app.post('/createUser', function(req, res){
    conn.connect(function(err) {
        var insert = `insert into USERS(USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL,CPF, DT_NASCIMENTO, ENDERECO, NUMERO, COMPLEMENTO)values('?', '?', '?', '?', '?', '?','?', '?', '?', '?')`;
        conn.query(insert, [username, password, first_name, last_name, email, cpf, dt_nascimento, endereco, numero, complemento], function(err ,data) {
            if (err) throw err;
        conn.query(insert, dados,function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
        });
      });
    })