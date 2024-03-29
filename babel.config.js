module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@assets': './src/assets',
            '@config': './src/config',
            '@routes': './src/routes',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@services': './src/services',
            '@contexts': './src/contexts',
            '@dtos': './src/dtos',
            '@hooks': './src/hooks'
          },
        },
      ],
    ],
  };
};
