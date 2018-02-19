
var path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  // webpack: {
  //   styles: {
  //     css: [
  //       {
  //         include: [path.resolve('src'), path.resolve('styles')],
  //         css: {
  //           modules: true,
  //           localIdentName: '[local]__[hash:base64:5]',
  //         },
  //       },
  //       // {
  //       //   exclude: [path.resolve('src'), path.resolve('css')],
  //       // },
  //       {
  //         exclude: [path.resolve('node_modules')],
  //       },
  //     ],
  //     less: [
  //       {
  //         include: [path.resolve('src')],
  //         css: {
  //           modules: true,
  //           localIdentName: '[local]__[hash:base64:5]',
  //         },
  //       }, 
  //       // {
  //       //   exclude: [path.resolve('src'), path.resolve('styles')],
  //       // },
  //       {
  //         exclude: [path.resolve('node_modules')],
  //       },
  //     ],
  //   },
  // },
}
