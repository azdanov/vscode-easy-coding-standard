module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json"
    }
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["src/test/index.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
  roots: ["<rootDir>/src/"],
  testEnvironment: "node"
};
