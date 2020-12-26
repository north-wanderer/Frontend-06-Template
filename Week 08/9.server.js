const http = require('http')

const port = 8080
http.createServer((req, res) => {
  let body = []
  req.on('error', err => { console.log(err) })
    .on('data', chunk => {
      // console.log('chunk',chunk)
      body.push(chunk.toString())
    })
    .on('end', () => {
      body = Buffer.concat([Buffer.from(body.toString())]).toString()
      console.log('body:', body)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(' Hello World\n')
    })
}).listen(port)
console.log(`server started at ${port}`)
