module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "**/tests/**/*.spec.ts",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
}