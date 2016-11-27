import express from 'express'
import { loadResources } from './resources.js'

const app = express()

app.get('/api/resources', (req, res) => {
  loadResources('./example')
    .then(JSON.stringify)
    .then((json) => res.send(json))
})

app.listen(3000, () => {
  console.log('lingui-translator running at http://localhost:3000')
})
