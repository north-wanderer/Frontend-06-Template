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
        `<html maaa=a>
        <head>
            <style>
        #container {
            width: 500px;
            height: 300px;
            display: flex;
            background-color: rgb(255,255,255);
        }
        #container #myid {
            width: 200px;
            height: 100px;
            background-color: rgb(255,0,0);
        }
        #container .c1 {
            flex: 1;
            background-color: rgb(0,255,0);
        }
            </style>
        </head>
        <body>
            <div id='container'>
                <img id='myid' />
                <img class='c1'/>
            </div>
        </body>
        </html>`
      )
    })
}).listen(port)
console.log(`server started at ${port}`)
