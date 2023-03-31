// const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/src/tools/MockModules.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js'
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svgMock.js'
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
    'node_modules/(?!native-base)/',
    'node_modules/(?!react-native|expo-secure-store|@react-native-picker|@react-native-community|expo-updates|@unimodules)'
  ]
};
