module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  setupTestFrameworkScriptFile: "jest-extended",
  verbose: true,
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: null
};
