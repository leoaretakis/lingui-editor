import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from './webpack.babel.js'

import { loadResources, loadResource, saveResource } from './resources.js'

const app = express()
const compiler = webpack(config)
const middleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

app.use(bodyParser.json())
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/', (req, res) => {
  const filename = path.resolve('./src/index.html')
  res.write(middleware.fileSystem.readFileSync(filename))
  res.end()
})

app.get('/api/resources', (req, res) => {
  loadResources('./example')
    .then(JSON.stringify)
    .then((json) => res.send(json))
})

app.get('/api/messages/:file', (req, res) => {
  loadResource(req.params['file'])
    .then((json) => res.json(json))
})

app.post('/api/messages/:file', (req, res) => {
  saveResource(req.params['file'], req.body)
    .then((json) => res.json(json))
})

app.listen(3000, () => {
  console.log('lingui-editor running at http://localhost:3000')
})
