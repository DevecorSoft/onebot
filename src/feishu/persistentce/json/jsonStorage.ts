import fs from 'fs'

const storageDir = './.storage'
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
