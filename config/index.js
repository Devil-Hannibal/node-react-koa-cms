module.exports={
    admin:{
        dev:{
            env:'development',
            publicPath:'/',
            host:'localhost',
            port:'8080',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable:{
                '/admin_api':{
                    target:'', //地址
                    changeOrigin:true,
                    pathRewrite:{
                        '/admin_api':'/'
                    }
                }
            }
        },
        build:{
            env: 'production', // 当前环境
            publicPath: '/admin/', // html引用资源路径
            assetsPath: 'static', // 静态资源目录
            assetsSubDirectory: 'static', // html资源存放目录
            devtoolType: 'source-map', // 代码位置信息
            productionGzip: false, //开启Gzip压缩
            productionGzipExtensions: ['js', 'css'] //Gzip压缩文件
        }        
    },
    client:{

        dev:{
            env:'development',
            publicPath:'/',
            host:'localhost',
            port:'8092',
            assetsSubDirectory: 'static',
            devtoolType: 'cheap-module-eval-source-map',
            proxyTable:{
                '/client_api':{
                    target:'', //地址
                    changeOrigin:true,
                    pathRewrite:{
                        '/client_api':'/'
                    }
                }
            }
        },
        build:{
            env: 'production', // 当前环境
            publicPath: '/client/', // html引用资源路径
            assetsPath: 'static', // 静态资源目录
            assetsSubDirectory: 'static', // html资源存放目录
            devtoolType: 'source-map', // 代码位置信息
            productionGzip: false, //开启Gzip压缩
            productionGzipExtensions: ['js', 'css'] //Gzip压缩文件
        }
    }
}