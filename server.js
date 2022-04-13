const expres = require('express')
const path = require('path')

const app = expres()

app.use(expres.static('./dist/angular-ocr-tl'))

app.get('/*', (req,res)=>{
    res.sendFile('index.html', {root: 'dist/angular-ocr-tl/'})
})

app.listen(process.env.PORT || 3000)