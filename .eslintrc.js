module.exports = {
    parser: 'babel-eslint',
    env: {
        es6: true,
    },
    plugins: ['jest'],
    overrides: [
        {
            files: ['src/**/*.test.js', 'src/test_util/**/*.js'],
            env: {
                'jest/globals': true,
            },
        },
    ],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
