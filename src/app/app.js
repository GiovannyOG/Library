/**
 * File: app.js
 */

const express = require('express')
let app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

let liverload = require('livereload')
let lrserver = liverload.createServer()
lrserver.watch(__dirname)
