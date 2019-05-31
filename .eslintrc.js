module.exports = {
	extends: ['@fizzmod/eslint-config', 'prettier', 'prettier/react'],
	plugins: ['babel', 'prettier'],
	parser: 'babel-eslint',
	rules: {
		'prettier/prettier': 'error'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.json'],
				moduleDirectory: [
					'node_modules',
					'public/src',
					'src'
				]
			}
		}
	},
	globals: {
		shallow: true,
		Enzyme: true,
		render: true,
		mount: true
	}
}