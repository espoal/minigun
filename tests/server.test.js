const dns = require('dns')
const http = require('http')
const https = require('https')
const http2 = require('http2')

// const callback = (res) => console.log({res})

const reqOptions = {
    agent: undefined,
    auth: "",
    createConnection: false,
    defaultPort: 8000,
    family: 4,
    headers: undefined,
    hostname: 'localhost',
    insecureHTTPParser: false,
    localAddress: '127.0.0.1',
    lookup: dns.lookup,
    maxHeaderSize: 16384,
    method: 'GET',
    path: '/',
    protocol: 'http:',
    port: 8000,
    setHost: true,
    timeOut: 500,
    callback: null
}


test('http server', done => {

    const server = http.createServer((req, res) => {
        // console.log({req})
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('hello world \n')
    })

    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    server.listen(8000)

    reqOptions.agent = new http.Agent()

    const req = http.request(reqOptions, (res) => {
        //console.log({res})
        expect(res).toBeTruthy()
        expect(res.statusCode).toBe(200)
        expect(res.httpVersion).toBe('1.1')
        expect(res.httpVersion).toBe('1.1')
        server.close()
        done()
    })


    req.end()





})





const fs = require('fs')

test('read certificates', ()=> {

        const options = {
            key: fs.readFileSync('./server/certs/RootCA.key'),
            cert: fs.readFileSync('./server/certs/RootCA.pem')
        }


    expect(options).toBeTruthy()
})


test('https server', done => {

    const options = {
        key: fs.readFileSync('./server/certs/RootCA.key'),
        cert: fs.readFileSync('./server/certs/RootCA.pem')
    }

    const secureServer = https.createServer(options, (req, res) => {
        // console.log({req})
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('hello world \n')
    })

    secureServer.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    secureServer.listen(8443)

    reqOptions.agent = new https.Agent({rejectUnauthorized: false})

    reqOptions.protocol = 'https:'

    reqOptions.port = 8443

    const req = https.request(reqOptions, res => {
        // console.log({res})
        expect(res).toBeTruthy()
        expect(res.statusCode).toBe(200)
        expect(res.httpVersion).toBe('1.1')
        expect(res.httpVersion).toBe('1.1')
        secureServer.close()
        done()
    })


    req.end()





})

test('http2 server', done => {

    const h2Server = http2.createSecureServer({
        key: fs.readFileSync('./server/certs/RootCA.key'),
        cert: fs.readFileSync('./server/certs/RootCA.pem')
    })

    h2Server.on('error', err => console.log({err}) )

    h2Server.on('stream', (stream, headers) => {
        // stream is a Duplex
        stream.respond({
            'content-type': 'text/html',
            ':status': 200
        })

        stream.write('hello ')

        stream.end('World\n')
    })

    h2Server.listen(8080)

    const client = http2.connect('https://localhost:8080', {
        rejectUnauthorized: false
    })

    client.on('error', err => console.error(err))

    const req = client.request({ ':path': '/' })

    let data = ''

    req.on('data', (chunk) => { data += chunk; })

    req.on('end', () => {
        expect(data).toBe('hello World\n')
        client.close()
        h2Server.close()
        req.end()
        done()
    })








})





