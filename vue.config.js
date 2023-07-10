const { defineConfig } = require('@vue/cli-service')
const { DEFAULT_PORT } = require('./config/index.ts')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: DEFAULT_PORT
  }
})
