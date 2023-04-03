import fs from 'fs'
import process from 'process'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const storageDir = `${process.env.HOME}/.onebot/storage`
fs.existsSync(storageDir) || fs.mkdirSync(storageDir)
export const storage: PropertiesService = {
  getScriptProperties: () => ({
    getProperty: (key) => {
      const path = `${storageDir}/${key}.json`
      return fs.existsSync(path) ? String.fromCharCode(...fs.readFileSync(path)) : null
    },
    setProperty: (key, value) => fs.writeFileSync(`${storageDir}/${key}.json`, value) }
  ),
  getUserProperties: () => ({
    getProperty: () => '',
    setProperty: () => ''
  })
}
