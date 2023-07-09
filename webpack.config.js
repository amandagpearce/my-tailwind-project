const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

/*We are basically telling webpack to take index.tsx from entry. Then check for all file extensions in resolve.
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports = (env) => {
  return {
    /** "mode"
     * the environment - development, production, none. tells webpack
     * to use its built-in optimizations accordingly. default is production
     */
    mode: 'development',
    /** "entry"
     * the entry point
     */
    entry: './src/index.tsx',
    output: {
      /** "path"
       * the folder path of the output file
       */
      path: path.resolve(__dirname, 'dist'),
      /** "filename"
       * the name of the output file
       */
      filename: 'main.js',
    },
    /** "target"
     * setting "node" as target app (server side), and setting it as "web" is
     * for browser (client side). Default is "web"
     */
    target: 'web',
    devServer: {
      historyApiFallback: true,
      /** "port"
       * port of dev server
       */
      port: '9500',
      /** "static"
       * This property tells Webpack what static file it should serve
       */
      static: ['./public'],
      /** "open"
       * opens the browser after server is successfully started
       */
      open: true,
      /** "hot"
       * enabling and disabling HMR. takes "true", "false" and "only".
       * "only" is used if enable Hot Module Replacement without page
       * refresh as a fallback in case of build failures
       */
      hot: true,
      /** "liveReload"
       * disable live reload on the browser. "hot" must be set to false for this to work
       */
      liveReload: true,
    },
    resolve: {
      /** "extensions"
       * If multiple files share the same name but have different extensions, webpack will
       * resolve the one with the extension listed first in the array and skip the rest.
       * This is what enables users to leave off the extension when importing
       */
      extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.json'],
    },
    module: {
      /** "rules"
       * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
       * file inside of a require()/import statement, use the babel-loader to transform it before you
       * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
       * being searched"
       */
      rules: [
        {
          test: /\.ts$|tsx/, //kind of file extension this rule should look for and apply in test
          exclude: /node_modules/, //folder to be excluded
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.d\.ts$/, // Add a rule for handling TypeScript declaration files
          use: 'null-loader',
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: `./environments/.env${env.file ? `.${env.file}` : ''}`,
      }),
    ],
  };
};
