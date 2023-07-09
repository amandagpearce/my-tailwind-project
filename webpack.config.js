const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env, options) => {
  const isDevelopment = options.mode === 'development';
  const dotenvFile = isDevelopment ? '.env.development' : '.env';

  console.log('isDevelopment', isDevelopment);
  console.log('REACT_BACKEND_URL', process.env.REACT_BACKEND_URL);
  console.log('REACT_GOOGLE_KEY', process.env.REACT_GOOGLE_KEY);

  const envPath =
    env && env.file ? `./environments/.env.${env.file}` : './environments/.env';

  return {
    mode: options.mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    target: 'web',
    devServer: {
      historyApiFallback: true,
      port: '9500',
      static: ['./public'],
      open: true,
      hot: true,
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
      rules: [
        {
          /** When webpack comes across a path that resolves to a '.ts or .tsx'
           * file inside of a require()/import statement, use the babel-loader
           * to transform it before it gets added to the bundle **/
          test: /\.ts$|tsx/,
          exclude: /node_modules/,
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
          test: /\.d\.ts$/, // rule for handling TypeScript declaration files
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
        path: `./environments/${dotenvFile}`,
      }),
      new webpack.EnvironmentPlugin([
        'REACT_GOOGLE_KEY',
        'REACT_BACKEND_URL',
        'REACT_ASSET_URL',
      ]),
    ],
  };
};
