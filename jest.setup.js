// jest.setup.js
import '@testing-library/jest-native/extend-expect';
// jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// src/setupTests.js
// import mockSafeAreaContext from 'react-native-safe-area-context';

global.self = global;
global.window = {};
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function FormDataMock() {
  this.append = function () {};
}
// @reference https://github.com/miragejs/miragejs/issues/967#issuecomment-890249442
// @reference https://github.com/pretenderjs/pretender/pull/320/files
global.FormData = FormDataMock;
