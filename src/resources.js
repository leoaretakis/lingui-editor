import fs from 'fs'
import os from 'os'
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

    resolve(catalog)
  })
}

function saveResource (resource, {language, messages}) {
  return new Promise((resolve, reject) => {
    const filename = fs.lstatSync(resource).isDirectory()
      ? path.join(resource, `${language}.json`)
      : `${resource}.${language}.json`

    fs.writeFileSync(filename, JSON.stringify(messages, null, 2) + os.EOL)
    resolve(messages)
  })
}

export { loadResources, loadResource, saveResource }
