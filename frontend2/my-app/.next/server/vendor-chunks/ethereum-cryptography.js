"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ethereum-cryptography";
exports.ids = ["vendor-chunks/ethereum-cryptography"];
exports.modules = {

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/aes.js":
/*!*******************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/aes.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decrypt: () => (/* binding */ decrypt),\n/* harmony export */   encrypt: () => (/* binding */ encrypt)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/crypto */ \"(ssr)/./node_modules/@noble/hashes/esm/cryptoNode.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/ethereum-cryptography/esm/utils.js\");\n\n\nconst crypto = { web: _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_1__.crypto };\nfunction validateOpt(key, iv, mode) {\n    if (!mode.startsWith(\"aes-\")) {\n        throw new Error(`AES submodule doesn't support mode ${mode}`);\n    }\n    if (iv.length !== 16) {\n        throw new Error(\"AES: wrong IV length\");\n    }\n    if ((mode.startsWith(\"aes-128\") && key.length !== 16) ||\n        (mode.startsWith(\"aes-256\") && key.length !== 32)) {\n        throw new Error(\"AES: wrong key length\");\n    }\n}\nasync function getBrowserKey(mode, key, iv) {\n    if (!crypto.web) {\n        throw new Error(\"Browser crypto not available.\");\n    }\n    let keyMode;\n    if ([\"aes-128-cbc\", \"aes-256-cbc\"].includes(mode)) {\n        keyMode = \"cbc\";\n    }\n    if ([\"aes-128-ctr\", \"aes-256-ctr\"].includes(mode)) {\n        keyMode = \"ctr\";\n    }\n    if (!keyMode) {\n        throw new Error(\"AES: unsupported mode\");\n    }\n    const wKey = await crypto.web.subtle.importKey(\"raw\", key, { name: `AES-${keyMode.toUpperCase()}`, length: key.length * 8 }, true, [\"encrypt\", \"decrypt\"]);\n    // node.js uses whole 128 bit as a counter, without nonce, instead of 64 bit\n    // recommended by NIST SP800-38A\n    return [wKey, { name: `aes-${keyMode}`, iv, counter: iv, length: 128 }];\n}\nasync function encrypt(msg, key, iv, mode = \"aes-128-ctr\", pkcs7PaddingEnabled = true) {\n    validateOpt(key, iv, mode);\n    if (crypto.web) {\n        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);\n        const cipher = await crypto.web.subtle.encrypt(wOpt, wKey, msg);\n        // Remove PKCS7 padding on cbc mode by stripping end of message\n        let res = new Uint8Array(cipher);\n        if (!pkcs7PaddingEnabled && wOpt.name === \"aes-cbc\" && !(msg.length % 16)) {\n            res = res.slice(0, -16);\n        }\n        return res;\n    }\n    else if (crypto.node) {\n        const cipher = crypto.node.createCipheriv(mode, key, iv);\n        cipher.setAutoPadding(pkcs7PaddingEnabled);\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.concatBytes)(cipher.update(msg), cipher.final());\n    }\n    else {\n        throw new Error(\"The environment doesn't have AES module\");\n    }\n}\nasync function getPadding(cypherText, key, iv, mode) {\n    const lastBlock = cypherText.slice(-16);\n    for (let i = 0; i < 16; i++) {\n        // Undo xor of iv and fill with lastBlock ^ padding (16)\n        lastBlock[i] ^= iv[i] ^ 16;\n    }\n    const res = await encrypt(lastBlock, key, iv, mode);\n    return res.slice(0, 16);\n}\nasync function decrypt(cypherText, key, iv, mode = \"aes-128-ctr\", pkcs7PaddingEnabled = true) {\n    validateOpt(key, iv, mode);\n    if (crypto.web) {\n        const [wKey, wOpt] = await getBrowserKey(mode, key, iv);\n        // Add empty padding so Chrome will correctly decrypt message\n        if (!pkcs7PaddingEnabled && wOpt.name === \"aes-cbc\") {\n            const padding = await getPadding(cypherText, key, iv, mode);\n            cypherText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.concatBytes)(cypherText, padding);\n        }\n        const msg = await crypto.web.subtle.decrypt(wOpt, wKey, cypherText);\n        const msgBytes = new Uint8Array(msg);\n        // Safari always ignores padding (if no padding -> broken message)\n        if (wOpt.name === \"aes-cbc\") {\n            const encrypted = await encrypt(msgBytes, key, iv, mode);\n            if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.equalsBytes)(encrypted, cypherText)) {\n                throw new Error(\"AES: wrong padding\");\n            }\n        }\n        return msgBytes;\n    }\n    else if (crypto.node) {\n        const decipher = crypto.node.createDecipheriv(mode, key, iv);\n        decipher.setAutoPadding(pkcs7PaddingEnabled);\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.concatBytes)(decipher.update(cypherText), decipher.final());\n    }\n    else {\n        throw new Error(\"The environment doesn't have AES module\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9hZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFvRDtBQUNFO0FBQ3RELGlCQUFpQixLQUFLLHdEQUFFO0FBQ3hCO0FBQ0E7QUFDQSw4REFBOEQsS0FBSztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGFBQWEsc0JBQXNCLDJCQUEyQjtBQUMvSDtBQUNBO0FBQ0Esb0JBQW9CLGFBQWEsUUFBUSxpQ0FBaUM7QUFDMUU7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNEQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNEQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNEQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9hZXMuanM/MzRkNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcnlwdG8gYXMgY3IgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy9jcnlwdG9cIjtcbmltcG9ydCB7IGNvbmNhdEJ5dGVzLCBlcXVhbHNCeXRlcyB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5jb25zdCBjcnlwdG8gPSB7IHdlYjogY3IgfTtcbmZ1bmN0aW9uIHZhbGlkYXRlT3B0KGtleSwgaXYsIG1vZGUpIHtcbiAgICBpZiAoIW1vZGUuc3RhcnRzV2l0aChcImFlcy1cIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBRVMgc3VibW9kdWxlIGRvZXNuJ3Qgc3VwcG9ydCBtb2RlICR7bW9kZX1gKTtcbiAgICB9XG4gICAgaWYgKGl2Lmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQUVTOiB3cm9uZyBJViBsZW5ndGhcIik7XG4gICAgfVxuICAgIGlmICgobW9kZS5zdGFydHNXaXRoKFwiYWVzLTEyOFwiKSAmJiBrZXkubGVuZ3RoICE9PSAxNikgfHxcbiAgICAgICAgKG1vZGUuc3RhcnRzV2l0aChcImFlcy0yNTZcIikgJiYga2V5Lmxlbmd0aCAhPT0gMzIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFFUzogd3Jvbmcga2V5IGxlbmd0aFwiKTtcbiAgICB9XG59XG5hc3luYyBmdW5jdGlvbiBnZXRCcm93c2VyS2V5KG1vZGUsIGtleSwgaXYpIHtcbiAgICBpZiAoIWNyeXB0by53ZWIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnJvd3NlciBjcnlwdG8gbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfVxuICAgIGxldCBrZXlNb2RlO1xuICAgIGlmIChbXCJhZXMtMTI4LWNiY1wiLCBcImFlcy0yNTYtY2JjXCJdLmluY2x1ZGVzKG1vZGUpKSB7XG4gICAgICAgIGtleU1vZGUgPSBcImNiY1wiO1xuICAgIH1cbiAgICBpZiAoW1wiYWVzLTEyOC1jdHJcIiwgXCJhZXMtMjU2LWN0clwiXS5pbmNsdWRlcyhtb2RlKSkge1xuICAgICAgICBrZXlNb2RlID0gXCJjdHJcIjtcbiAgICB9XG4gICAgaWYgKCFrZXlNb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFFUzogdW5zdXBwb3J0ZWQgbW9kZVwiKTtcbiAgICB9XG4gICAgY29uc3Qgd0tleSA9IGF3YWl0IGNyeXB0by53ZWIuc3VidGxlLmltcG9ydEtleShcInJhd1wiLCBrZXksIHsgbmFtZTogYEFFUy0ke2tleU1vZGUudG9VcHBlckNhc2UoKX1gLCBsZW5ndGg6IGtleS5sZW5ndGggKiA4IH0sIHRydWUsIFtcImVuY3J5cHRcIiwgXCJkZWNyeXB0XCJdKTtcbiAgICAvLyBub2RlLmpzIHVzZXMgd2hvbGUgMTI4IGJpdCBhcyBhIGNvdW50ZXIsIHdpdGhvdXQgbm9uY2UsIGluc3RlYWQgb2YgNjQgYml0XG4gICAgLy8gcmVjb21tZW5kZWQgYnkgTklTVCBTUDgwMC0zOEFcbiAgICByZXR1cm4gW3dLZXksIHsgbmFtZTogYGFlcy0ke2tleU1vZGV9YCwgaXYsIGNvdW50ZXI6IGl2LCBsZW5ndGg6IDEyOCB9XTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbmNyeXB0KG1zZywga2V5LCBpdiwgbW9kZSA9IFwiYWVzLTEyOC1jdHJcIiwgcGtjczdQYWRkaW5nRW5hYmxlZCA9IHRydWUpIHtcbiAgICB2YWxpZGF0ZU9wdChrZXksIGl2LCBtb2RlKTtcbiAgICBpZiAoY3J5cHRvLndlYikge1xuICAgICAgICBjb25zdCBbd0tleSwgd09wdF0gPSBhd2FpdCBnZXRCcm93c2VyS2V5KG1vZGUsIGtleSwgaXYpO1xuICAgICAgICBjb25zdCBjaXBoZXIgPSBhd2FpdCBjcnlwdG8ud2ViLnN1YnRsZS5lbmNyeXB0KHdPcHQsIHdLZXksIG1zZyk7XG4gICAgICAgIC8vIFJlbW92ZSBQS0NTNyBwYWRkaW5nIG9uIGNiYyBtb2RlIGJ5IHN0cmlwcGluZyBlbmQgb2YgbWVzc2FnZVxuICAgICAgICBsZXQgcmVzID0gbmV3IFVpbnQ4QXJyYXkoY2lwaGVyKTtcbiAgICAgICAgaWYgKCFwa2NzN1BhZGRpbmdFbmFibGVkICYmIHdPcHQubmFtZSA9PT0gXCJhZXMtY2JjXCIgJiYgIShtc2cubGVuZ3RoICUgMTYpKSB7XG4gICAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgLTE2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBlbHNlIGlmIChjcnlwdG8ubm9kZSkge1xuICAgICAgICBjb25zdCBjaXBoZXIgPSBjcnlwdG8ubm9kZS5jcmVhdGVDaXBoZXJpdihtb2RlLCBrZXksIGl2KTtcbiAgICAgICAgY2lwaGVyLnNldEF1dG9QYWRkaW5nKHBrY3M3UGFkZGluZ0VuYWJsZWQpO1xuICAgICAgICByZXR1cm4gY29uY2F0Qnl0ZXMoY2lwaGVyLnVwZGF0ZShtc2cpLCBjaXBoZXIuZmluYWwoKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIEFFUyBtb2R1bGVcIik7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gZ2V0UGFkZGluZyhjeXBoZXJUZXh0LCBrZXksIGl2LCBtb2RlKSB7XG4gICAgY29uc3QgbGFzdEJsb2NrID0gY3lwaGVyVGV4dC5zbGljZSgtMTYpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAvLyBVbmRvIHhvciBvZiBpdiBhbmQgZmlsbCB3aXRoIGxhc3RCbG9jayBeIHBhZGRpbmcgKDE2KVxuICAgICAgICBsYXN0QmxvY2tbaV0gXj0gaXZbaV0gXiAxNjtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZW5jcnlwdChsYXN0QmxvY2ssIGtleSwgaXYsIG1vZGUpO1xuICAgIHJldHVybiByZXMuc2xpY2UoMCwgMTYpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlY3J5cHQoY3lwaGVyVGV4dCwga2V5LCBpdiwgbW9kZSA9IFwiYWVzLTEyOC1jdHJcIiwgcGtjczdQYWRkaW5nRW5hYmxlZCA9IHRydWUpIHtcbiAgICB2YWxpZGF0ZU9wdChrZXksIGl2LCBtb2RlKTtcbiAgICBpZiAoY3J5cHRvLndlYikge1xuICAgICAgICBjb25zdCBbd0tleSwgd09wdF0gPSBhd2FpdCBnZXRCcm93c2VyS2V5KG1vZGUsIGtleSwgaXYpO1xuICAgICAgICAvLyBBZGQgZW1wdHkgcGFkZGluZyBzbyBDaHJvbWUgd2lsbCBjb3JyZWN0bHkgZGVjcnlwdCBtZXNzYWdlXG4gICAgICAgIGlmICghcGtjczdQYWRkaW5nRW5hYmxlZCAmJiB3T3B0Lm5hbWUgPT09IFwiYWVzLWNiY1wiKSB7XG4gICAgICAgICAgICBjb25zdCBwYWRkaW5nID0gYXdhaXQgZ2V0UGFkZGluZyhjeXBoZXJUZXh0LCBrZXksIGl2LCBtb2RlKTtcbiAgICAgICAgICAgIGN5cGhlclRleHQgPSBjb25jYXRCeXRlcyhjeXBoZXJUZXh0LCBwYWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtc2cgPSBhd2FpdCBjcnlwdG8ud2ViLnN1YnRsZS5kZWNyeXB0KHdPcHQsIHdLZXksIGN5cGhlclRleHQpO1xuICAgICAgICBjb25zdCBtc2dCeXRlcyA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgIC8vIFNhZmFyaSBhbHdheXMgaWdub3JlcyBwYWRkaW5nIChpZiBubyBwYWRkaW5nIC0+IGJyb2tlbiBtZXNzYWdlKVxuICAgICAgICBpZiAod09wdC5uYW1lID09PSBcImFlcy1jYmNcIikge1xuICAgICAgICAgICAgY29uc3QgZW5jcnlwdGVkID0gYXdhaXQgZW5jcnlwdChtc2dCeXRlcywga2V5LCBpdiwgbW9kZSk7XG4gICAgICAgICAgICBpZiAoIWVxdWFsc0J5dGVzKGVuY3J5cHRlZCwgY3lwaGVyVGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBRVM6IHdyb25nIHBhZGRpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZ0J5dGVzO1xuICAgIH1cbiAgICBlbHNlIGlmIChjcnlwdG8ubm9kZSkge1xuICAgICAgICBjb25zdCBkZWNpcGhlciA9IGNyeXB0by5ub2RlLmNyZWF0ZURlY2lwaGVyaXYobW9kZSwga2V5LCBpdik7XG4gICAgICAgIGRlY2lwaGVyLnNldEF1dG9QYWRkaW5nKHBrY3M3UGFkZGluZ0VuYWJsZWQpO1xuICAgICAgICByZXR1cm4gY29uY2F0Qnl0ZXMoZGVjaXBoZXIudXBkYXRlKGN5cGhlclRleHQpLCBkZWNpcGhlci5maW5hbCgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgQUVTIG1vZHVsZVwiKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/aes.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/keccak.js":
/*!**********************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/keccak.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   keccak224: () => (/* binding */ keccak224),\n/* harmony export */   keccak256: () => (/* binding */ keccak256),\n/* harmony export */   keccak384: () => (/* binding */ keccak384),\n/* harmony export */   keccak512: () => (/* binding */ keccak512)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/sha3 */ \"(ssr)/./node_modules/@noble/hashes/esm/sha3.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/ethereum-cryptography/esm/utils.js\");\n\n\nconst keccak224 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_224);\nconst keccak256 = (() => {\n    const k = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256);\n    k.create = _noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_256.create;\n    return k;\n})();\nconst keccak384 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_384);\nconst keccak512 = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapHash)(_noble_hashes_sha3__WEBPACK_IMPORTED_MODULE_1__.keccak_512);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9rZWNjYWsuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9GO0FBQzlDO0FBQy9CLGtCQUFrQixtREFBUSxDQUFDLDBEQUFVO0FBQ3JDO0FBQ1AsY0FBYyxtREFBUSxDQUFDLDBEQUFVO0FBQ2pDLGVBQWUsMERBQVU7QUFDekI7QUFDQSxDQUFDO0FBQ00sa0JBQWtCLG1EQUFRLENBQUMsMERBQVU7QUFDckMsa0JBQWtCLG1EQUFRLENBQUMsMERBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9rZWNjYWsuanM/YTlhZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBrZWNjYWtfMjI0LCBrZWNjYWtfMjU2LCBrZWNjYWtfMzg0LCBrZWNjYWtfNTEyIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvc2hhM1wiO1xuaW1wb3J0IHsgd3JhcEhhc2ggfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuZXhwb3J0IGNvbnN0IGtlY2NhazIyNCA9IHdyYXBIYXNoKGtlY2Nha18yMjQpO1xuZXhwb3J0IGNvbnN0IGtlY2NhazI1NiA9ICgoKSA9PiB7XG4gICAgY29uc3QgayA9IHdyYXBIYXNoKGtlY2Nha18yNTYpO1xuICAgIGsuY3JlYXRlID0ga2VjY2FrXzI1Ni5jcmVhdGU7XG4gICAgcmV0dXJuIGs7XG59KSgpO1xuZXhwb3J0IGNvbnN0IGtlY2NhazM4NCA9IHdyYXBIYXNoKGtlY2Nha18zODQpO1xuZXhwb3J0IGNvbnN0IGtlY2NhazUxMiA9IHdyYXBIYXNoKGtlY2Nha181MTIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/keccak.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/pbkdf2.js":
/*!**********************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/pbkdf2.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   pbkdf2: () => (/* binding */ pbkdf2),\n/* harmony export */   pbkdf2Sync: () => (/* binding */ pbkdf2Sync)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_pbkdf2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/pbkdf2 */ \"(ssr)/./node_modules/@noble/hashes/esm/pbkdf2.js\");\n/* harmony import */ var _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @noble/hashes/sha256 */ \"(ssr)/./node_modules/@noble/hashes/esm/sha256.js\");\n/* harmony import */ var _noble_hashes_sha512__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @noble/hashes/sha512 */ \"(ssr)/./node_modules/@noble/hashes/esm/sha512.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/ethereum-cryptography/esm/utils.js\");\n\n\n\n\nasync function pbkdf2(password, salt, iterations, keylen, digest) {\n    if (![\"sha256\", \"sha512\"].includes(digest)) {\n        throw new Error(\"Only sha256 and sha512 are supported\");\n    }\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(password);\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(salt);\n    return (0,_noble_hashes_pbkdf2__WEBPACK_IMPORTED_MODULE_1__.pbkdf2Async)(digest === \"sha256\" ? _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_2__.sha256 : _noble_hashes_sha512__WEBPACK_IMPORTED_MODULE_3__.sha512, password, salt, {\n        c: iterations,\n        dkLen: keylen\n    });\n}\nfunction pbkdf2Sync(password, salt, iterations, keylen, digest) {\n    if (![\"sha256\", \"sha512\"].includes(digest)) {\n        throw new Error(\"Only sha256 and sha512 are supported\");\n    }\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(password);\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(salt);\n    return (0,_noble_hashes_pbkdf2__WEBPACK_IMPORTED_MODULE_1__.pbkdf2)(digest === \"sha256\" ? _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_2__.sha256 : _noble_hashes_sha512__WEBPACK_IMPORTED_MODULE_3__.sha512, password, salt, {\n        c: iterations,\n        dkLen: keylen\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9wYmtkZjIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXNGO0FBQ3hDO0FBQ0E7QUFDTDtBQUNsQztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUksc0RBQVc7QUFDZixJQUFJLHNEQUFXO0FBQ2YsV0FBVyxpRUFBWSx1QkFBdUIsd0RBQU0sR0FBRyx3REFBTTtBQUM3RDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFXO0FBQ2YsSUFBSSxzREFBVztBQUNmLFdBQVcsNERBQU8sdUJBQXVCLHdEQUFNLEdBQUcsd0RBQU07QUFDeEQ7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvZXNtL3Bia2RmMi5qcz82YjhhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBia2RmMiBhcyBfcGJrZGYyLCBwYmtkZjJBc3luYyBhcyBfcGJrZGYyQXN5bmMgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy9wYmtkZjJcIjtcbmltcG9ydCB7IHNoYTI1NiB9IGZyb20gXCJAbm9ibGUvaGFzaGVzL3NoYTI1NlwiO1xuaW1wb3J0IHsgc2hhNTEyIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvc2hhNTEyXCI7XG5pbXBvcnQgeyBhc3NlcnRCeXRlcyB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcGJrZGYyKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCBrZXlsZW4sIGRpZ2VzdCkge1xuICAgIGlmICghW1wic2hhMjU2XCIsIFwic2hhNTEyXCJdLmluY2x1ZGVzKGRpZ2VzdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBzaGEyNTYgYW5kIHNoYTUxMiBhcmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cbiAgICBhc3NlcnRCeXRlcyhwYXNzd29yZCk7XG4gICAgYXNzZXJ0Qnl0ZXMoc2FsdCk7XG4gICAgcmV0dXJuIF9wYmtkZjJBc3luYyhkaWdlc3QgPT09IFwic2hhMjU2XCIgPyBzaGEyNTYgOiBzaGE1MTIsIHBhc3N3b3JkLCBzYWx0LCB7XG4gICAgICAgIGM6IGl0ZXJhdGlvbnMsXG4gICAgICAgIGRrTGVuOiBrZXlsZW5cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYmtkZjJTeW5jKHBhc3N3b3JkLCBzYWx0LCBpdGVyYXRpb25zLCBrZXlsZW4sIGRpZ2VzdCkge1xuICAgIGlmICghW1wic2hhMjU2XCIsIFwic2hhNTEyXCJdLmluY2x1ZGVzKGRpZ2VzdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBzaGEyNTYgYW5kIHNoYTUxMiBhcmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cbiAgICBhc3NlcnRCeXRlcyhwYXNzd29yZCk7XG4gICAgYXNzZXJ0Qnl0ZXMoc2FsdCk7XG4gICAgcmV0dXJuIF9wYmtkZjIoZGlnZXN0ID09PSBcInNoYTI1NlwiID8gc2hhMjU2IDogc2hhNTEyLCBwYXNzd29yZCwgc2FsdCwge1xuICAgICAgICBjOiBpdGVyYXRpb25zLFxuICAgICAgICBka0xlbjoga2V5bGVuXG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/pbkdf2.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/random.js":
/*!**********************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/random.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandomBytes: () => (/* binding */ getRandomBytes),\n/* harmony export */   getRandomBytesSync: () => (/* binding */ getRandomBytesSync)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/utils */ \"(ssr)/./node_modules/@noble/hashes/esm/utils.js\");\n\nfunction getRandomBytesSync(bytes) {\n    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(bytes);\n}\nasync function getRandomBytes(bytes) {\n    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(bytes);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9yYW5kb20uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWtEO0FBQzNDO0FBQ1AsV0FBVyxnRUFBVztBQUN0QjtBQUNPO0FBQ1AsV0FBVyxnRUFBVztBQUN0QiIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvZXNtL3JhbmRvbS5qcz8yNzk0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJhbmRvbUJ5dGVzIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21CeXRlc1N5bmMoYnl0ZXMpIHtcbiAgICByZXR1cm4gcmFuZG9tQnl0ZXMoYnl0ZXMpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJhbmRvbUJ5dGVzKGJ5dGVzKSB7XG4gICAgcmV0dXJuIHJhbmRvbUJ5dGVzKGJ5dGVzKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/random.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/scrypt.js":
/*!**********************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/scrypt.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scrypt: () => (/* binding */ scrypt),\n/* harmony export */   scryptSync: () => (/* binding */ scryptSync)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_scrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/scrypt */ \"(ssr)/./node_modules/@noble/hashes/esm/scrypt.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/ethereum-cryptography/esm/utils.js\");\n\n\nasync function scrypt(password, salt, n, p, r, dkLen, onProgress) {\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(password);\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(salt);\n    return (0,_noble_hashes_scrypt__WEBPACK_IMPORTED_MODULE_1__.scryptAsync)(password, salt, { N: n, r, p, dkLen, onProgress });\n}\nfunction scryptSync(password, salt, n, p, r, dkLen, onProgress) {\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(password);\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.assertBytes)(salt);\n    return (0,_noble_hashes_scrypt__WEBPACK_IMPORTED_MODULE_1__.scrypt)(password, salt, { N: n, r, p, dkLen, onProgress });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9zY3J5cHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE4RTtBQUNyQztBQUNsQztBQUNQLElBQUksc0RBQVc7QUFDZixJQUFJLHNEQUFXO0FBQ2YsV0FBVyxpRUFBTSxtQkFBbUIsK0JBQStCO0FBQ25FO0FBQ087QUFDUCxJQUFJLHNEQUFXO0FBQ2YsSUFBSSxzREFBVztBQUNmLFdBQVcsNERBQUssbUJBQW1CLCtCQUErQjtBQUNsRSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy9ldGhlcmV1bS1jcnlwdG9ncmFwaHkvZXNtL3NjcnlwdC5qcz80OTUyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjcnlwdCBhcyBfc3luYywgc2NyeXB0QXN5bmMgYXMgX2FzeW5jIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvc2NyeXB0XCI7XG5pbXBvcnQgeyBhc3NlcnRCeXRlcyB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2NyeXB0KHBhc3N3b3JkLCBzYWx0LCBuLCBwLCByLCBka0xlbiwgb25Qcm9ncmVzcykge1xuICAgIGFzc2VydEJ5dGVzKHBhc3N3b3JkKTtcbiAgICBhc3NlcnRCeXRlcyhzYWx0KTtcbiAgICByZXR1cm4gX2FzeW5jKHBhc3N3b3JkLCBzYWx0LCB7IE46IG4sIHIsIHAsIGRrTGVuLCBvblByb2dyZXNzIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcnlwdFN5bmMocGFzc3dvcmQsIHNhbHQsIG4sIHAsIHIsIGRrTGVuLCBvblByb2dyZXNzKSB7XG4gICAgYXNzZXJ0Qnl0ZXMocGFzc3dvcmQpO1xuICAgIGFzc2VydEJ5dGVzKHNhbHQpO1xuICAgIHJldHVybiBfc3luYyhwYXNzd29yZCwgc2FsdCwgeyBOOiBuLCByLCBwLCBka0xlbiwgb25Qcm9ncmVzcyB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/scrypt.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/secp256k1.js":
/*!*************************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/secp256k1.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   secp256k1: () => (/* reexport safe */ _noble_curves_secp256k1__WEBPACK_IMPORTED_MODULE_0__.secp256k1)\n/* harmony export */ });\n/* harmony import */ var _noble_curves_secp256k1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/curves/secp256k1 */ \"(ssr)/./node_modules/@noble/curves/esm/secp256k1.js\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9zZWNwMjU2azEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBb0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS9zZWNwMjU2azEuanM/YWQ3YSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBzZWNwMjU2azEgfSBmcm9tIFwiQG5vYmxlL2N1cnZlcy9zZWNwMjU2azFcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/secp256k1.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/ethereum-cryptography/esm/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/ethereum-cryptography/esm/utils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   assertBool: () => (/* binding */ assertBool),\n/* harmony export */   assertBytes: () => (/* binding */ assertBytes),\n/* harmony export */   bytesToHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),\n/* harmony export */   bytesToUtf8: () => (/* binding */ bytesToUtf8),\n/* harmony export */   concatBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.concatBytes),\n/* harmony export */   createView: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.createView),\n/* harmony export */   crypto: () => (/* binding */ crypto),\n/* harmony export */   equalsBytes: () => (/* binding */ equalsBytes),\n/* harmony export */   hexToBytes: () => (/* binding */ hexToBytes),\n/* harmony export */   toHex: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.bytesToHex),\n/* harmony export */   utf8ToBytes: () => (/* reexport safe */ _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.utf8ToBytes),\n/* harmony export */   wrapHash: () => (/* binding */ wrapHash)\n/* harmony export */ });\n/* harmony import */ var _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noble/hashes/_assert */ \"(ssr)/./node_modules/@noble/hashes/esm/_assert.js\");\n/* harmony import */ var _noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noble/hashes/utils */ \"(ssr)/./node_modules/@noble/hashes/esm/utils.js\");\n\n\nconst assertBool = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bool;\nconst assertBytes = _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bytes;\n\n\n// buf.toString('utf8') -> bytesToUtf8(buf)\nfunction bytesToUtf8(data) {\n    if (!(data instanceof Uint8Array)) {\n        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);\n    }\n    return new TextDecoder().decode(data);\n}\nfunction hexToBytes(data) {\n    const sliced = data.startsWith(\"0x\") ? data.substring(2) : data;\n    return (0,_noble_hashes_utils__WEBPACK_IMPORTED_MODULE_1__.hexToBytes)(sliced);\n}\n// buf.equals(buf2) -> equalsBytes(buf, buf2)\nfunction equalsBytes(a, b) {\n    if (a.length !== b.length) {\n        return false;\n    }\n    for (let i = 0; i < a.length; i++) {\n        if (a[i] !== b[i]) {\n            return false;\n        }\n    }\n    return true;\n}\n// Internal utils\nfunction wrapHash(hash) {\n    return (msg) => {\n        _noble_hashes_assert__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bytes(msg);\n        return hash(msg);\n    };\n}\n// TODO(v3): switch away from node crypto, remove this unnecessary variable.\nconst crypto = (() => {\n    const webCrypto = typeof globalThis === \"object\" && \"crypto\" in globalThis ? globalThis.crypto : undefined;\n    const nodeRequire = typeof module !== \"undefined\" &&\n        typeof module.require === \"function\" &&\n        module.require.bind(module);\n    return {\n        node: nodeRequire && !webCrypto ? nodeRequire(\"crypto\") : undefined,\n        web: webCrypto\n    };\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS91dGlscy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEyQztBQUNxQjtBQUNoRSxtQkFBbUIsaUVBQVc7QUFDOUIsb0JBQW9CLGtFQUFZO0FBQ0c7QUFDeUU7QUFDNUc7QUFDTztBQUNQO0FBQ0Esb0VBQW9FLFlBQVk7QUFDaEY7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLFdBQVcsK0RBQVc7QUFDdEI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsUUFBUSxrRUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9ub2RlX21vZHVsZXMvZXRoZXJldW0tY3J5cHRvZ3JhcGh5L2VzbS91dGlscy5qcz82MGY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcIkBub2JsZS9oYXNoZXMvX2Fzc2VydFwiO1xuaW1wb3J0IHsgaGV4VG9CeXRlcyBhcyBfaGV4VG9CeXRlcyB9IGZyb20gXCJAbm9ibGUvaGFzaGVzL3V0aWxzXCI7XG5jb25zdCBhc3NlcnRCb29sID0gYXNzZXJ0LmJvb2w7XG5jb25zdCBhc3NlcnRCeXRlcyA9IGFzc2VydC5ieXRlcztcbmV4cG9ydCB7IGFzc2VydEJvb2wsIGFzc2VydEJ5dGVzIH07XG5leHBvcnQgeyBieXRlc1RvSGV4LCBieXRlc1RvSGV4IGFzIHRvSGV4LCBjb25jYXRCeXRlcywgY3JlYXRlVmlldywgdXRmOFRvQnl0ZXMgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy91dGlsc1wiO1xuLy8gYnVmLnRvU3RyaW5nKCd1dGY4JykgLT4gYnl0ZXNUb1V0ZjgoYnVmKVxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9VdGY4KGRhdGEpIHtcbiAgICBpZiAoIShkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnl0ZXNUb1V0ZjggZXhwZWN0ZWQgVWludDhBcnJheSwgZ290ICR7dHlwZW9mIGRhdGF9YCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoZGF0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGV4VG9CeXRlcyhkYXRhKSB7XG4gICAgY29uc3Qgc2xpY2VkID0gZGF0YS5zdGFydHNXaXRoKFwiMHhcIikgPyBkYXRhLnN1YnN0cmluZygyKSA6IGRhdGE7XG4gICAgcmV0dXJuIF9oZXhUb0J5dGVzKHNsaWNlZCk7XG59XG4vLyBidWYuZXF1YWxzKGJ1ZjIpIC0+IGVxdWFsc0J5dGVzKGJ1ZiwgYnVmMilcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHNCeXRlcyhhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8gSW50ZXJuYWwgdXRpbHNcbmV4cG9ydCBmdW5jdGlvbiB3cmFwSGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChtc2cpID0+IHtcbiAgICAgICAgYXNzZXJ0LmJ5dGVzKG1zZyk7XG4gICAgICAgIHJldHVybiBoYXNoKG1zZyk7XG4gICAgfTtcbn1cbi8vIFRPRE8odjMpOiBzd2l0Y2ggYXdheSBmcm9tIG5vZGUgY3J5cHRvLCByZW1vdmUgdGhpcyB1bm5lY2Vzc2FyeSB2YXJpYWJsZS5cbmV4cG9ydCBjb25zdCBjcnlwdG8gPSAoKCkgPT4ge1xuICAgIGNvbnN0IHdlYkNyeXB0byA9IHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiICYmIFwiY3J5cHRvXCIgaW4gZ2xvYmFsVGhpcyA/IGdsb2JhbFRoaXMuY3J5cHRvIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5vZGVSZXF1aXJlID0gdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0eXBlb2YgbW9kdWxlLnJlcXVpcmUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBtb2R1bGUucmVxdWlyZS5iaW5kKG1vZHVsZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZTogbm9kZVJlcXVpcmUgJiYgIXdlYkNyeXB0byA/IG5vZGVSZXF1aXJlKFwiY3J5cHRvXCIpIDogdW5kZWZpbmVkLFxuICAgICAgICB3ZWI6IHdlYkNyeXB0b1xuICAgIH07XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ethereum-cryptography/esm/utils.js\n");

/***/ })

};
;