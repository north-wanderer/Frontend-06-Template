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
      // console.log('body:', body)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
`<html maaa=a >
<head>
<style>
body div #myid {
width: 100px;
background-color: #ff5000;
}
body div img {
width: 30px;
background-color: #ff111111;
}
</style>
</head>
<body>
<div>
<img id="myid"/>
<img />
</div>
</body>
</html>`
      )
    })
}).listen(port)
console.log(`server started at ${port}`)
