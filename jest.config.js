module.exports = {
  testEnvironment: 'jsdom',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-native-vector-icons' +
      '|@react-native-picker/picker' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-image-picker' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-image-resizer' +
      '|@react-native-community/art' +
      ')/)',
  ],
}
