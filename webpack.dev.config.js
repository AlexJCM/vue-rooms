const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/main.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"), //obtiene la direccion root de nuestro proyecto y
    filename: "js/bundle-[name].js", //[name] obtiene el nombre del entry para guardarlo con ese nombre
    publicPath: "http://localhost:9000/", //consumimos los archivos desde nuestra ruta de desarrollo
    chunkFilename: "js/[id].[chunkhash].js" //perzonaliza el nombre de los  chunks
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 9000,
    hot: true
  },
  resolve: {
    //para solucionar esta ruta por ejemplo:
    //import Modal from '@/components/Modal.vue';
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css|postcss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg|gif|woff|eot|ttf|mp4|webm)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/" //90KB. Lo recomendado como maximo es 100KB
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //es conveniente no cambiarle de nombre al archivo
      template: path.resolve(__dirname, "public/index.html") //toma como base este index
      //(el cual no es el que está dist/ obviamente)  para crear el archivo anterior.
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};
