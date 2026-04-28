import { includeIgnoreFile } from '@eslint/compat';
import stylistic from '@stylistic/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Linter } from 'eslint';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, '.gitignore');

const sharedRules: Linter.RulesRecord = {
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
