const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt')
      // Optionally, you can also provide the passphrase for the key file
      // passphrase: 'your_passphrase_here'
    }
  }
})
