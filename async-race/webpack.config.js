const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const mode = env.dev ? 'development' : 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      title: 'Async Race',
    }),
    new MiniCssExtractPlugin(),
  ];

  let sourceMap = 'source-map';

  if (mode === 'production') {
    plugins.push(
      new ESLintPlugin({
        context: './src',
        extensions: ['ts'],
      })
    );
    sourceMap = 'eval';
  }

  return {
    entry: './src/index.ts',
    mode: mode,
    devtool: sourceMap,
    devServer: {
      contentBase: './dir',
    },
    output: {
      filename: './main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@view': '../view',
        '@store': './store',
        '@controller': './controller',
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext]',
          },
        },
        {
          test: /\.ts$/i,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: plugins,
  };
};
