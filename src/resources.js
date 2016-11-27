import fs from 'fs'
import path from 'path'

const langRe = /(.*)([a-z]{2})\.json/

function groupByLanguage (files) {
  return (
    files
    .map((filename) => langRe.exec(filename))
    .reduce((acc, item) => {
      const {1: basename, 2: lang, input} = item
      if (!acc[basename]) acc[basename] = {}

      acc[basename][lang] = input

      return acc
    }, {})
  )
}

function loadResources (pathname) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathname, (err, files) => {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(
          groupByLanguage(
            files.map((filename) => path.join(pathname, filename))
          )
        )
      }
    })
  })
}

function loadResource (resource) {
  return new Promise((resolve, reject) => {
    const pathname = fs.lstatSync(resource).isDirectory() ? resource : path.dirname(resource)
    const catalog = {}

    fs.readdirSync(pathname)
    .map((filename) => path.join(pathname, filename))
    .filter((filename) => filename.startsWith(resource)).forEach((filename) => {
      const {2: lang} = langRe.exec(filename)

      const data = JSON.parse(fs.readFileSync(filename))
      Object.keys(data).forEach((key) => {
        if (!catalog[key]) catalog[key] = {}
        catalog[key][lang] = data[key]
      })
    })

    // convert dict to array
    const arr = Object.keys(catalog).map((key) => catalog[key])
    resolve(arr)
  })
}

function saveResource (resource, {language, messages}) {
  console.log()
}

export { loadResources, loadResource, saveResource }
