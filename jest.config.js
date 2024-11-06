module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 100,
      lines: 90,
      statements: 90,
    },
  },
  collectCoverageFrom: [
    'src/**/*.service.{ts,js}',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/entity/*',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
