/**
 * Created by Liu on 2020/6/10.
 */
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        file: 'dist/vuem.js',
        name: 'Vuem',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        })
    ]
}