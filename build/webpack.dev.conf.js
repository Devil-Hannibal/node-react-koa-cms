'use strict'
const path=require('path');
const webpack=require('webpack');
const isAdmin=process.env_NODE_ENV_TYPE==="admin";
console.log(isAdmin,88)
const devConf=isAdmin?require('../config').admin.dev:require('../config').client.dev; //开发环境配置参数
const baseConf =require('./webpack.base.conf');

//一个webpack配置合并模块
const merge = require("webpack-merge");
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin");
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
//发送系统通知的一个node模块！
const notifier = require("node-notifier");

// 拼接路径
const resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}
// 资源路径
const assetsPath = function (dir) {
    return path.posix.join(devConf.assetsSubDirectory, dir)
}

const dev=merge(baseConf,{
    output: {
        //文件名
        filename: '[name]-[hash].js',
        //html引用资源路径,在dev-server中,引用的是内存中文件！
        publicPath: devConf.publicPath
    },
    module:{
        // rules:styleLoader.styleLoader({ extract: false, sourceMap: true })
    },
    devtool:devConf.devtoolType,
     //启动一个express服务器,使我们可以在本地进行开发！！！
    devServer:{
        hot:true,//热加载,
        inline:true,//自动刷新
        open:true,//自动打开
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: devConf.host, //主机名
        port: devConf.port, //端口号
        proxy: devConf.proxyTable, //配置反向代理解决跨域
        compress:true,//代码压缩
        overlay:{       //在浏览器上全屏显示错误信息
            errors:true,
            warnings:false,
        },
        quiet:true// 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的

    },
    
    plugins:[
        // 启用热更新
        new webpack.HotModuleReplacementPlugin(),
        // 显示对应模块路径
        new webpack.NamedModulesPlugin(),
        // 配置文件入口
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:(isAdmin?'../code/admin/index.html':'../code/client/index.html'),
            inject:true,
        }),
        // 编译插件
        new FriendlyErrorsPlugin({
            compilationSuccessInfo:{
                messages:[
                    `Your application is running here: http://${devConf.host}:${devConf.port}`
                ]
            },
            onErrors:function(severity,errors){
                if(severity!=='error'){
                    return;
                }
                const error=errors[0];
                const filename = error.file.split("!").pop();
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "blog",
                    message: severity + ": " + error.name,
                    subtitle: filename || ""
                });


            }
        })
    ]
})
module.exports=dev;