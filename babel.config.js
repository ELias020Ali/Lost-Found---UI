module.exports = {
    presets: [
        '@babel/preset-env', // Transpile modern JavaScript
        ['@babel/preset-react', { runtime: 'automatic' }] // Transpile JSX
    ],
};