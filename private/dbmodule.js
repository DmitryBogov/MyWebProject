const pg = require('pg')
const { Client } = require('pg')
//Создание клиента базы для базы данных
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'webProject',
  password: '1234',
})





module.exports = function (fnk, _parser) {
  fnk.post('/registration', _parser, function (req, res) {
    var user = req.body;
    client.connect();
    client.query('INSERT INTO db_accounts (Name, Password) VALUES ($1, $2);', [user.name, user.password], function (err, response) {
        // выполнился
        console.log('[SERVER]: New user add <' + user.name + '>');

        client.end()
        res.sendFile(process.cwd() + '/public/html/login.html');
      })
    })

    fnk.post('/login', _parser, function (req, res) {
      if(!req.body) return res.sendStatus(400);
      var user = req.body;
      client.connect();
      client.query('SELECT id from db_accounts WHERE Name= $1 AND Password= $2', [user.name, user.password], function (err, response) {
        if (response && response.rowCount) {
          if (response.rows) {
            console.log('[SERVER]: User <' + user.name +'> Online. Id is <'+ response.rows[0].id + '>');
          } else {
            console.log('[SERVER]: User <' + user.name +'> try to login');
          }

        }
        client.end()
          //res.sendFile(process.cwd() + '/public/html/login.html');
        });
      })






}
