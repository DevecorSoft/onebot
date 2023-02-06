const test_globals = require('./test/global')

module.exports = {
  preset: 'ts-jest',
  globals: {
    ...test_globals
  },
  setupFilesAfterEnv: ['jest-extended'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.ts$': ['ts-jest'],
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  bail: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
}
