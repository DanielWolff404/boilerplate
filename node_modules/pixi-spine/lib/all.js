/* eslint-disable */
 
/*!
 * pixi-spine - v3.1.0
 * Compiled Sun, 07 Aug 2022 23:00:37 UTC
 *
 * pixi-spine is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2019-2020, Ivan Igorevich Popelyshev <ivan.popelyshev@gmail.com>, All Rights Reserved
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var loaderUni = require('@pixi-spine/loader-uni');
var base = require('@pixi-spine/base');
var runtime4_1 = require('@pixi-spine/runtime-4.1');

loaderUni.SpineParser.registerLoaderPlugin();

Object.defineProperty(exports, 'Spine', {
	enumerable: true,
	get: function () { return loaderUni.Spine; }
});
Object.defineProperty(exports, 'SpineParser', {
	enumerable: true,
	get: function () { return loaderUni.SpineParser; }
});
Object.defineProperty(exports, 'SkeletonBounds', {
	enumerable: true,
	get: function () { return runtime4_1.SkeletonBounds; }
});
Object.keys(base).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return base[k]; }
	});
});
//# sourceMappingURL=all.js.map
