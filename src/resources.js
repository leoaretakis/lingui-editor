import fs from 'fs'
import path from 'path'

function groupByLanguage (files) {
  const langRe = /(.*)([a-z]{2})\.json/

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

export { loadResources }
