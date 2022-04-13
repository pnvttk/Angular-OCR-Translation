const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('./dist/angular-ocr-tl'))

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/ng-ocr-mtl/'}),
);

app.listen(process.env.PORT || 3000)