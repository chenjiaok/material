var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var bodyParser = require('body-parser')
let XLSX = require('xlsx')
let Busboy = require('busboy')
var pool  = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '000000',
	port: '3306',
  database: 'omma',
  dateStrings: true   
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	next()
})


//material
//material/select all list
router.get('/material/findall', (req, res) => {
  console.log('material findall: ')
  var sql = 'select * from material order by updataTime desc'
  pool.getConnection(function(err, connection) {
      connection.query(sql, (err,data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
          console.log('data',data)
        }
        connection.release();
      })
  })
})

//material/select the recent list
router.get('/material/detail', (req, res) => {
  console.log('find material order by updataTime desc')
  var sql = 'select * from material order by updataTime desc limit 1'
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data[0])
        res.send(data[0])
      }
      connection.release();
    })
  })  
})

//material/select the only list
router.get('/material/detail/findonly', (req, res) => {
  console.log('get material detail by id')
  console.log('req.query.id:',req.query.id)
  var sql = 'select * from material where code=' + req.query.id
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data[0])
        console.log(!data[0])
        if(data[0]){
          res.send(data[0])
        } else {
          res.send('notfound')
        }        
      }
      connection.release();
    })
  })  
})

//select the name like 
router.get('/material/detail/findlike', (req, res) => {
  console.log('find material name like')
  console.log('name:',req.query.id)
  var sql = "select * from material where name like '%" + req.query.id +"%'"
  console.log(sql)
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(typeof data )
        console.log('data',JSON.stringify(data) == '[]')      
        if(data && JSON.stringify(data) !== '[]'){
          console.log('已找到且对象不为空')
          res.send(data)
        } else if (JSON.stringify(data) == '[]') {
          console.log('对象为空')
          res.send('notfound')
        }        
      }
      connection.release();
    })
  })  
})

//material/add
router.post('/material/add', (req, res) => {
  var sqls = "select code from material where code=" + req.body.code
  var sqli = `insert into material values (?, ?, ?, ?, ?, ?)`
  console.log('add req.body:',req.body) 
  pool.getConnection(function(err, connection) {
    connection.query(sqls, (err,data) => {
    //console.log(res.data)
      if (err) {
        console.log(err)
      } else {
        console.log('data.length',data.length)
        console.log('data',data)
        if(data.length){
          res.send('exists')
        } else {
          console.log('else') 
          connection.query(sqli,[req.body.code, req.body.name, req.body.classify, req.body.supplier, req.body.spn, req.body.updataTime], (err, data) => {
            if (err) {
              res.send(err)
            } else {
              res.send(data)
            }
          
          })          
        }    
      }
      connection.release();
    })    
  }) 
})

//material/put
router.put('/material/put',(req, res) => {
  var sql = `update material set name=?,classify=?,supplier=?,spn=?,updataTime=? where code=` + req.body.code
  pool.getConnection(function(err,connection) {
    connection.query(sql, [req.body.name, req.body.classify, req.body.supplier, req.body.spn, req.body.updataTime], (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
      connection.release();  
    })
  })
})

//material/delete
router.delete('/material/delete/:id',(req, res) => {
  console.log(req.params.id)
  var sql = `delete from material where code=` + req.params.id
  pool.getConnection(function(err,connection) {
    connection.query(sql, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
      connection.release();  
    })
  })
})

//stock/find all list
router.get('/stock/findall', (req, res) => {
  console.log('get index')  
  var sql = 'select code,name,classify,supplier,spn, sum(count) as "count" from stock as count group by code'
  pool.getConnection(function(err, connection) {
      connection.query(sql, (err,data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
          console.log(data)
        }
        connection.release();
      })
  })
})

//stock/find name like
router.get('/stock/detail/findlike', (req, res) => {
  console.log('find stock name like')
  console.log('name:',req.query.id)
  var sql = "select * from stock where name like '%" + req.query.id +"%'"
  console.log(sql)
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(typeof data )
        console.log('data',JSON.stringify(data) == '[]')
      
        if(data && JSON.stringify(data) !== '[]'){
          console.log('已找到且对象不为空')
          res.send(data)
        } else if (JSON.stringify(data) == '[]') {
          console.log('对象为空')
          res.send('notfound')
        }        
      }
      connection.release();
    })
  })  
})

//stock/find only code
router.get('/stock/detail/findonly', (req, res) => {
  console.log('get stock detail by id')
  console.log('req.query.id:', req.query.id)
  var sql = 'select * from stock where code=' + req.query.id
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data[0])
        console.log(!data[0])
        if(data[0]){
          res.send(data[0])
        } else {
          res.send('notfound')
        }      
      }
      connection.release();
    })
  })  
})

//stock/detail
router.get('/stock/detail', (req, res) => {
  console.log('get stock detail by id')
  var sql = 'select * from stock order by updataTime desc'
  pool.getConnection(function(err, connection) {
    connection.query(sql, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        res.send(data)       
      }
      connection.release();
    })
  })  
})

//stock/history
router.get('/stock/history', (req, res) => {
  console.log('stock find history: ')
  var sql = 'select * from stock order by updataTime desc'
  pool.getConnection(function(err, connection) {
      connection.query(sql, (err,data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
          console.log('data',data)
        }
        connection.release();
      })
  })
})

//stock/findin
router.get('/stock/findin', (req, res) => {
  console.log('stock findin: ')
  console.log(req.params.id)
  var sql = 'select * from stock where count >0 order by updataTime desc'
  pool.getConnection(function(err, connection) {
      connection.query(sql, (err,data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
          console.log('data',data)
        }
        connection.release();
      })
  })
})

//stock/findout
router.get('/stock/findout', (req, res) => {
  console.log('stock findout: ')
  var sql = 'select * from stock where count <0 order by updataTime desc'
  pool.getConnection(function(err, connection) {
      connection.query(sql, (err,data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
          console.log('data',data)
        }
        connection.release();
      })
  })
})


///stock/put
router.post('/stock/put', (req, res) => {
  var sqls = "select code from material where code=" + req.body.code

  var sqli = "insert into stock (code,name,classify,supplier,spn,count,remarks,updataTime) values (?, ?, ?, ?, ?, ?, ?, ?)"
  console.log('add req.body:',req.body)  
  pool.getConnection(function(err, connection) {
    connection.query(sqls, (err,data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('data.length',data.length)
        console.log('data1',data)
        if(!data.length){
          console.log('else')       
          res.send('not exists')          
        } else {    
          connection.query(sqli,[req.body.code, req.body.name, req.body.classify, req.body.supplier, req.body.spn, req.body.count, req.body.remarks, req.body.updataTime], (err, data) => {
            if (err) {
              res.send(err)
            } else {
              console.log('data2',data)
              res.send(req.body.code)
            }          
          })
        }//else {'not enough'}
      }
      connection.release();
    }) 
  })
})


module.exports = router