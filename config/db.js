const MySql = require('mysql2');

const conn = MySql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user:"root",
        password: "Dev123456",
        database: "tcc_my_questions",
        insecureAuth : true
});

conn.connect(function(err){
    if (err) throw err;
    console.log("Conexão realizada com sucesso!");
    
});

conn.connect(function(err) {
    if (err) throw err;
    conn.query("SELECT * FROM USERS", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
