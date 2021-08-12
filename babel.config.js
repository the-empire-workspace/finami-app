module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@store': './src/store',
          '@interfaces': './src/interfaces',
          '@utils': './src/utils',
          '@translate': './src/translate',
          '@theme': './src/theme',
          '@providers': './src/providers',
          '@assets': './assets',
        },
      },
    ],
  ],
}
