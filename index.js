const express = require('express')
var cors = require('cors')

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const app = express()


app.use(cors())


app.get('/docker/logs', async (req, res, next) => {
  const { params } = req.query
  const keys = Object.keys(params)
  
  const bashParam = keys.map((key) => `${key} ${params[key].value}`)
  
  const responseData = await executeProcess(bashParam.toString())
  const result = [...responseData].map((container) => {
    return { ID: container.ID, Names: container.Names, Ports: container.Ports, Status: container.Status }
  })
  res.send(result)
})


const executeProcess = async (command) => {
  const { stdout, stderr } = await exec(`./remote.sh ${command}`);
  
  if (stderr.length > 0)
  throw new Error('error reading sh')
  
  const dockerLogsParse = JSON.parse(stdout)
  return dockerLogsParse
}


app.listen(3000, () => {
  console.log('Server Running at 3000');
})