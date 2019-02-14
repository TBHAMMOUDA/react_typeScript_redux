var express = require('express'),
    morgan = require('morgan'),
    port = process.env.PORT || 1337,
    app = express()

app.use(morgan('combined'))
app.use(express.static('dist'))

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port)