import https from 'https'
import http from 'http'
import http2 from 'http2'
import fs from 'fs'

const options = {
    key: fs.readFileSync('./server/certs/RootCA.key'),
    cert: fs.readFileSync('./server/certs/RootCA.pem')
}

const secureServer = https.createServer(options,(req, res) => {
    console.log({req})
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('hello world \n')
})

secureServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})


const server = http.createServer((req, res) => {
    console.log({req})
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('hello world \n')
})

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

const h2server = http2.createSecureServer(options)

h2server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/html',
        ':status': 200
    });
    stream.write('hello ')
    stream.end('world \n')
})

h2server.listen(8000)

server.listen(8080)

secureServer.listen(8443)
