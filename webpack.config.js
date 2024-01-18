const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || "development";

module.exports ={
   // name: 'react-webpack',
    mode,
    devtool: "eval", // production일 때는, hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./client', './TestComponent'],
    }, // 입력
    module: {
        rules: [{
            test: /\.jsx?$/, // js, jsx 파일에 rule 적용
            loader: 'babel-loader',
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
                plugins: [],
            }
        }]
    },
    plugins: [
        // 상단 module의 rules > options > plugin에 공통 옵션 
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }, // 출력


};