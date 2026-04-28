import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';

import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, '.gitignore');

const sharedRules = {
	'newline-before-return': 'error',
	'no-constant-binary-expression': 'error',
	'no-implicit-coercion': 'error',
	'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
	'no-nested-ternary': 'error',
	'no-underscore-dangle': ['error', { allowAfterThis: true }],
	'no-void': 'error',
	'@stylistic/semi': 'error',
	'max-len': [
		'error',
		{
			code: 180,
			comments: 500,
			ignorePattern: '^import .*',
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreTrailingComments: true,
		},
	],
	'padding-line-between-statements': [
		'error',
		{
			blankLine: 'always',
			prev: '*',
			next: ['return', 'if', 'switch', 'for', 'while', 'try', 'throw'],
		},
		{
			blankLine: 'any',
			prev: ['const', 'let', 'var', 'import'],
			next: ['const', 'let', 'var', 'import'],
		},
	],
	'consistent-return': 'warn',
	'no-param-reassign': 'warn',
	'react-hooks/rules-of-hooks': 'error',
	'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useSafeLayoutEffect|useUpdateEffect)' }],
	'react/react-in-jsx-scope': 'off',
	'react/self-closing-comp': ['warn', { component: true, html: true }],
	'react/no-unknown-property': ['error', { ignore: ['css'] }],
};

export default [
	includeIgnoreFile(gitignorePath),
	// JavaScript files
	{
		files: ['**/*.js', '**/*.jsx', '**/*.cjs'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			'@stylistic': stylistic,
			'react-hooks': reactHooks,
			react,
		},
		rules: {
			...sharedRules,
			'react/prop-types': ['error', { skipUndeclared: true }],
		},
		settings: {
			react: {
				version: '18',
			},
		},
	},
	// TypeScript files
	...tseslint.config({
		files: ['**/*.ts', '**/*.tsx'],
		extends: [tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: dirname,
			},
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		plugins: {
			'@stylistic': stylistic,
			'react-hooks': reactHooks,
			react,
		},
		rules: {
			...sharedRules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
		},
		settings: {
			react: {
				version: '18',
			},
		},
	}),
	eslintPluginPrettierRecommended,
];
