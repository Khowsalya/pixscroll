// src/jestSetup.js
const {
  expect,
  jest,
  describe,
  test,
  beforeEach,
  afterEach,
  it,
} = require("@jest/globals");

global.expect = expect;
global.jest = jest;
global.describe = describe;
global.test = test;
global.it = it;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
