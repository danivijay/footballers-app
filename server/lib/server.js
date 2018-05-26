import http from 'http'
import app from './app'
import importer from 'node-mysql-importer'

import db from './api/models'
import config from './api/config'

const port = process.env.PORT || 3000

var mysql = require('mysql')

var con = mysql.createConnection({
  'host': config.db.host,
  'user': config.db.user,
  'password': config.db.password
})

con.connect(function(err) {
  if (err) throw err
  con.query("CREATE DATABASE IF NOT EXISTS CSV_DB", function (err, result) {
    if (err) throw err
    //sqldumpExecsql()
    sqldumpImporter()
  })
})

const server = http.createServer(app)

function sqldumpExecsql() {
  var execsql = require('execsql'),
      dbConfig = {
          host: config.db.host,
          user: config.db.user,
          password: config.db.password
      },
      sql = 'use footballers;',
      sqlFile = __dirname + '/api/sqldumps/footballers2655c10.sql';
  execsql.config(dbConfig)
      .exec(sql)
      .execFile(sqlFile, function(err, results){
          console.log(results)
          syncSequelize()
      }).end()
}


function sqldumpImporter() {
  importer.config({
    'host': config.db.host,
    'user': config.db.user,
    'password': config.db.password,
    'database': config.db.database
  })
  
  importer.importSQL('./lib/api/sqldumps/footballers2655c10.sql').then( () => {
    console.log('SQL dump successfully loaded')
    syncSequelize()
  }).catch( err => {
    console.log(`error: ${err}`)
  })
}

function syncSequelize() {
  db.sequelize.sync()
    .then(() => {
      server.listen(port, () => console.log(`listening on port ${port}`))
    })
}

