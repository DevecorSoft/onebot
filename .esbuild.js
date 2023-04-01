const fs = require('fs')
fs.existsSync('./dist') || fs.mkdirSync('./dist')
fs.copyFileSync('./appsscript.json', './dist/appsscript.json')

const credentials = `var ServiceAccountCredentials = ${String.fromCharCode(...fs.readFileSync('./serviceAccountCredentials.json'))}`
fs.writeFileSync('./dist/a_ServiceAccountCredentials.js', credentials)

require('esbuild')
  .build({
    entryPoints: ['src/google-chat/index.ts'],
    format: 'esm',
    bundle: true,
    treeShaking: false,
    outfile: 'dist/b_Code.js',
    color: true,
  })
  .catch(() => process.exit(1))
