module.exports = {
  verbose: true,
  globals: {
    __DEV__: true
  },
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.[cjt]s[x]{0,1}?$': 'babel-jest'
  },
  setupFiles: [
    '<rootDir>/jest-setup.ts',
    '<rootDir>/node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
    '<rootDir>/node_modules/@react-native-async-storage/async-storage/jest/async-storage-mock.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|react-redux)'
  ]
}
