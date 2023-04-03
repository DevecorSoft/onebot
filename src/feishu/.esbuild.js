const fs = require('fs')
fs.existsSync('./dist') || fs.mkdirSync('./dist')

require('esbuild')
  .build({
    entryPoints: ['server.ts'],
    platform: 'node',
    bundle: true,
    treeShaking: true,
    outfile: 'dist/index.js',
    color: true,
  })
  .catch(() => process.exit(1))
