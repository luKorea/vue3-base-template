const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const defaultSetting = require('./src/settings')

const pathSrc = path.resolve(__dirname, 'src')

module.exports = defineConfig({
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '^/api': {
        target: 'https://tcms.pofiart.com',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((arg) => {
      arg[0].title = defaultSetting.title
      return arg
    })
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'icon'
          })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // 使用element-plus的图标库
            // 其他图标库请到 https://icon-sets.iconify.design/
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      // 让unplugin-icons自动安装图标库
      Icons({
        compiler: 'vue3', // 编译方式
        autoInstall: true
      })
    ]
  }
})
