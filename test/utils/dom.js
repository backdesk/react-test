const jsdom = require('jsdom');

// Basic dom structure for throwing stuff into.
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

// See: https://github.com/tmpvar/jsdom/issues/1381.
global.window = document.defaultView;

// Most people set this to 'node.js'. I normally just use 'all'.
global.navigator = { userAgent: 'all' };