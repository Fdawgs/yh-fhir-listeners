module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'airbnb-base',
		'plugin:jsdoc/recommended',
		'plugin:security/recommended',
		'prettier'
	],
	parserOptions: {
		sourceType: 'script',
		ecmaFeatures: {
			globalReturn: true
		}
	},
	plugins: ['jsdoc', 'json', 'security'],
	root: true,
	rules: {
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1
			}
		],
		// Mirth specific settings
		'consistent-return': 'off', // Mirth has global returns
		eqeqeq: 'off', // Mirth errors with ===
		'no-param-reassign': 'warn',
		'no-plusplus': 'off',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'no-useless-return': 'warn',
		'prefer-destructuring': 'off',
		'vars-on-top': 'off'
	}
};
