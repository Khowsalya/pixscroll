module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/src/__mocks__/svgMock.js",
    "\\.(png|jpg|jpeg|gif|webp)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
