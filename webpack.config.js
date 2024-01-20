const path = require('path');
const webpack = require('webpack');
const childProcess = require("child_process");

const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const mode = process.env.NODE_ENV || "development";

module.exports ={
   // name: 'react-webpack',
    mode,
    devtool: "eval", // production일 때는, hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: './main.js', // 입력
    module: {
        rules: [{
            test: /\.(t|j)sx?$/, // js, jsx 파일에 rule 적용
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], // 브라우저 타겟 직접 명시. 지원해야 하는 브라우저가 많아진다면 바벨이 더 느려질 수 있음.
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins: [
                    'react-refresh/babel',
                ],
            }
        },
        {
            test: /\.css$/i,
            include: path.resolve(__dirname),
            exclude: /node_modules/,
            use: [
                //process.env.NODE_ENV === "production"
                //? 
                MiniCssExtractPlugin.loader,
                //: "style-loader",
                "css-loader"
            ],
        },
        {
            test: /\.(png|jpg|gif|svg|jpeg|webp)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 2 * 1024 // 20kb
                }
            }
        },
          // {
        //   test: /\.(png|jpg|gif|svg)$/,
        //   loader: "file-loader",
        //   loader: "url-loader",
        //   options: {
        //     publicPath: "./dist/",
        //     name: "[name].[ext]?[hash]",
        //     limit: 20000, // 2kb
        //   },
        // },
        ]
    },
    plugins: [
        // 상단 module의 rules > options > plugin에 공통 옵션 
        // new webpack.LoaderOptionsPlugin({ debug: true }),
        new BundleAnalyzerPlugin(),
        new RefreshWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "index.html",
            templateParameters: {
                env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
            },
            minify: 
                process.env.NODE_ENV === "production"
                ? {
                    collapseWhitespace: true, // 공백 없애줌
                    removeComments: true, // 주석 없애줌
                } : 
                false,
        }),
        new CleanWebpackPlugin(), // dist 파일 clean 후 재생성
        // ...(process.env.NODE_ENV === "production" // css나 javscript 파일을 하나로
        //   ? [
        //       new MiniCssExtractPlugin({
        //         filename: "[name].[contenthash].css",
        //         chunkFilename: "[id].[contenthash].css",
        //    }),
        //     ]
        //   : []),
        new MiniCssExtractPlugin(),
          new webpack.BannerPlugin({
            // 번들링된 상단 위에 빌드 정보 작성
            // 상단에 주석처럼 사용하기 좋음
            banner: `
              Build Date: ${new Date().toLocaleString()}
            `,
          }),
          new CopyPlugin({
            patterns: [
              {
                from: "./node_modules/axios/dist/axios.min.js",
                to: "./axios.min.js",
              },
            ],
          }),
    ],
    optimization: {
        minimizer: 
        mode === "production" ?
        [
            new CssMinimizerPlugin(),
            // v5에서는 이 과정에서 사용되는 플러그인으로 teser-webpack-plugin을 내장하고 있다. Terser는 동시에 난독화까지 해준다.
        ]
        : [],
        splitChunks: {
            chunks: "all"
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        // publicPath: '/dist'
    }, // 출력
    devServer: {
        devMiddleware: {
            publicPath: '/'
        },
        static: {
            directory: path.join(__dirname, './dist'),
        },
        // hot: true,
        compress: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false
            },
        },
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error("webpack-dev-server is not defined");
            }
        }
    },
};