import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  rootDir: './',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testPathIgnorePatterns: ['/node_modules/',
    '<rootDir>/src/module/agriculture-control/__test__/e2e/'
  ],
};

export default config;
