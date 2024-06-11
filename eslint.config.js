import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        files: ['**/*.jsx'],
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    },
    pluginReactConfig,
    configPrettier, // Extends the config to disable rules that conflict with Prettier
    {
        settings: {
            react: {
                version: 'detect', // Automatically detect the React version
            },
        },
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'no-undef': 'error',
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        },
        plugins: {
            prettier: pluginPrettier,
        },
    },
];
