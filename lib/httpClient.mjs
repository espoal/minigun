import { workerData, parentPort } from 'worker_threads'



// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
parentPort.postMessage({ hello: 'hello ' + workerData })
