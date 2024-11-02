module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/tests/**/*.(test|spec).ts'],
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^supertest$': 'supertest'
      },
  };
  