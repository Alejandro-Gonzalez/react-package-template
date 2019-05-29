import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json'
import pkg from './package.json';
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace';

export default [
	// browser-friendly UMD build
	{
		input: 'public/src/index.js',
		output: {
			name: 'main',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			json(),
			resolve(), // so Rollup can find `ms`
			babel({
				babelrc: false,
				runtimeHelpers: true,
				exclude: ['node_modules/**'],
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
			}),
			commonjs(),// so Rollup can convert `ms` to an ES module
			replace({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			serve({
				open: true,
				contentBase: ['public', 'dist'],
				host: 'localhost',
				port: 3001
			})
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.module, format: 'esm' },
			{ file: pkg.main, format: 'cjs' }
		],
		plugins: [
			babel({
				babelrc: false,
				runtimeHelpers: true,
				exclude: ['node_modules/**'],
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
			})
		],
		external: ['react', 'ReactDOM']
	}
];