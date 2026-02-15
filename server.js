const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')

const {mergePdfs} = require('./merge')
const upload = multer({dest:'uploads/'})
app.use('/static',express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async function(req, res) {

  try {

    console.log(req.files)

    const file1 = path.join(__dirname, req.files[0].path)
    const file2 = path.join(__dirname, req.files[1].path)

    const outputPath = path.join(__dirname, 'public', 'merged.pdf')
    await mergePdfs(file1, file2, outputPath)

    console.log("Merge completed")

    res.redirect("/static/merged.pdf")

  }
  catch(err) {
    console.log(err)
    res.send("Error merging PDFs")
  }

})
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})




