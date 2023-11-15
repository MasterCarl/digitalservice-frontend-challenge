export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      '^d3-interpolate$': '<rootDir>/../node_modules/d3-interpolate/dist/d3-interpolate.min.js',
      '^d3-scale-chromatic$': '<rootDir>/../node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.min.js',
      '^d3-color$': '<rootDir>/../node_modules/d3-color/dist/d3-color.min.js',
    },
    rootDir: 'src',
  };