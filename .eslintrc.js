module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  rules: {
    semi: [2, 'never'],
    curly: [2, 'multi'],
    'react-hooks/exhaustive-deps': 'off',
  },
}
