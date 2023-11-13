import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from 'webpack';

type Mode = 'development' | 'production'

interface EnvVariables {
    mode: Mode
}

export default (env: EnvVariables): webpack.Configuration => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'build'),
            clean: true
        },
        plugins: [new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })],

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
}
