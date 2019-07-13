const utils = require('util');

module.exports = {
  globals: {
    TextEncoder: utils.TextEncoder,
    TextDecoder: utils.TextDecoder
  },
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,mjs}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/store/index.js',
    '!src/styles/ThemeProvider.js',
    '!<rootDir>/node_modules/',
  ],
  coverageDirectory: 'coverage',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/config/jest/styleMock.js',
  },
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: ['node_modules', '/test/'],
  transformIgnorePatterns: ['<rootDir>[/\\\\\\\\](build|node_modules)[/\\\\\\\\]'],
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/fileTransform.js',
  },
  verbose: false,
};
