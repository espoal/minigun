import { Worker } from 'worker_threads'
// import dns from 'dns'

function runService (workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/httpClient.mjs', { workerData })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) { reject(new Error(`Worker stopped with exit code ${code}`)) }
    })
  })
}

export async function run (config) {
  const result = await runService(config)
  console.log(result)
}
