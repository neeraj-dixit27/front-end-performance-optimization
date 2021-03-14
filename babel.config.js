module.exports = function babelConfig(api) {
    api.cache.using(() => process.env.NODE_ENV === 'development');

    const presets = ['@babel/preset-env', '@babel/preset-react'];

    const plugins = [   
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
            [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                regenerator: true,
            },
            ]
    ];

    return {
        presets,
        plugins,
    };
}
