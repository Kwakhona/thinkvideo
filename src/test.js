import './vendor.js';
import './index.js';

import 'angular-mocks';


__karma__.loaded = () => { /* noop */ };

let context = require.context('./', true, /\.spec\.js$/);
context.keys().map(context);

__karma__.start();
