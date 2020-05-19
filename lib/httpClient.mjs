import { workerData, parentPort } from 'worker_threads'
import { performance } from 'perf_hooks'
import https from 'https'
import dns from 'dns'

const reqOptions = {
  agent: new https.Agent({ rejectUnauthorized: false }),
  auth: '',
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
  protocol: 'https:',
  port: 8443,
  setHost: true,
  timeOut: 500,
  callback: null
}

let time = performance.now()

const req = https.request(reqOptions, res => {
  time = performance.now() - time

  console.log({ res })

  parentPort.postMessage(time)
})

req.end()



// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
