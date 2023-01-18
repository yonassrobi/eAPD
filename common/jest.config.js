module.exports = {
  coverageDirectory: './coverage-endpoint/',
  rootDir: './',
  testMatch: ['**/*.test.{js,jsx}'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  testTimeout: 30000,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/schemas/**',
    '!**/*.test.{js,jsx}',
    '!**/coverage-endpoint/**',
    '!**/*.config.{js,jsx}',
    '!**/index.{js,jsx}',
    '!**/block-navigation.js',
    '!**/prettify.js',
    '!**/sorter.js'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageThreshold: {
    global: {
      branches: 74,
      functions: 80,
      lines: 80
    }
  }
};
