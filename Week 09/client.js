const net = require('net')
const parser = require('./parser')
class Request {
  constructor (options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    }
    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.entries(this.body).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length
  }

  toString () {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.entries(this.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}\r
\r
${this.bodyText}`
  }

  send (con) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()
      if (con) {
        con.write(this.toString())
      } else {
        con = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          con.write(this.toString())
        })
      }
      // console.log(this.toString())
      con.on('data', data => {
        // console.log(data.toString())
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
          con.end()
        }
      })

      con.on('error', err => {
        reject(err)
        con.end()
      })
    }).catch(err => {
      throw err
    })
  }
}
class ChunkedBodyParser {
  constructor () {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_CHUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }

  receiveChar (char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 16 // chunked返回的第一个是16进制的长度数字,所以在接收新的长度字符时，需要把已有的左移1位，也就是乘以16
        this.length += parseInt(char, 16) // 把新读入的16进制长度加上
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_CHUNK
      }
    } else if (this.current === this.READING_CHUNK) {
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }
  }
}
class ResponseParser {
  constructor () {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_NAME_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }

  get isFinished () {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response () {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)

    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive (str) {
    for (const c of str) {
      this.receiveChar(c)
    }
  }

  receiveChar (char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_NAME_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        // chunked 是 node.js 默认 encoding
        if (this.headers['Transfer-Encoding'] === 'chunked') { this.bodyParser = new ChunkedBodyParser() }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_NAME_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      // bodyParser 处理 body
      this.bodyParser.receiveChar(char)
    }
  }
}

/* eslint-disable no-void */
const remote = '127.0.0.1'
void (async function () {
  const request = new Request({
    method: 'POST',
    host: remote,
    port: 8080,
    path: '/',
    headers: {
      'X-Foo': 'custmized'
    },
    body: {
      name: 'bar',
      url: 'www.baz.com/'
    }
  })
  // console.log(request)
  const response = await request.send()
  // console.log(response)
  const dom = parser.parseHTML(response.body)
  console.log('dom', dom)
}())
