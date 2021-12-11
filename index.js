
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const encoder = bodyParser.urlencoded()

const app = express()
app.use('/assets/css', express.static('assets/css'))

const connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'ger140793',
    database:   'comment_on'
})

connection.connect( err => {
    if(err) throw err
    else console.log('Database connection succesfully!');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    res.end
    connection.query('SELECT * FROM comment', function(err, results, fields) {
        if(err) throw err
        console.log('comments retrieved from database');
    })
})

app.post("/",encoder, function(req,res){
    const author = req.body.author;
    var comment = req.body.comment;

    connection.query(`insert into comment(author, comment) values ('${author}', '${comment}')`, function(err,results,fields){
        if(err) throw err
        else console.log('comment added to database');
    })
})

app.listen(4000)

