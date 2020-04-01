'use strict'
const path = require('path');
const isAdmin = process.env.NODE_ENV_TYPE === 'admin'
const prodConf = isAdmin ? require('../config').admin.build : require('../config').client.build;

// 拼接路径
const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}
// 资源路径
const assetsPath = function (dir) {
  return path.posix.join(prodConf.assetsPath, dir)
}
module.exports = {
  entry: {
    app: [isAdmin ? resolve('code/admin/src/main.js') : resolve('code/client/src/main.js'), 'babel-polyfill']
  },
  resolve: {
      //自动解析文件扩展名(补全文件后缀)(从左->右)
      // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
      extensions: [".js", ".json"],

      //配置别名映射
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'src': (isAdmin ? resolve('code/admin/src') : resolve('code/client/src')),
        // 'components': (isAdmin ? resolve('code/admin/src/components') : resolve('code/client/src/components')),
        // 'assets': (isAdmin ? resolve('code/admin/src/assets') : resolve('code/client/src/assets')),
        // 'views': (isAdmin ? resolve('code/admin/src/views') : resolve('code/client/src/views')),
        // 'store': (isAdmin ? resolve('code/admin/src/store') : resolve('code/client/src/store'))
      }

  },
  module: {
    rules: [
      {
        test: /\.js$/, //资源路径
        loader: 'babel-loader', //该路径执行的loader
        // exclude: __dirname + '/node_modules/',  //指定哪个文件不需要loader
        include: isAdmin ? resolve("code/admin/src") : resolve("code/client/src") //指定哪个文件loader
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]

  }

}
