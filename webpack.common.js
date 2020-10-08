const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
 
module.exports = {
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            /* style and css loader */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    /* plugin */
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
              { from: 'pages', to: 'pages/' },
              { from: 'assets/css/', to: 'assets/css/' },
              { from: 'assets/img/', to: 'assets/img/' },
              { from: './nav.html' , to: 'nav.html'},
              { from: './service-worker.js', to: 'service-worker.js'},
              { from: './manifest.json', to: 'manifest.json'},
              { from: 'ico/', to: 'ico/'}
            ],
          }),
    ]
}