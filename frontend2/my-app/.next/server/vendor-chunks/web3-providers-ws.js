"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/web3-providers-ws";
exports.ids = ["vendor-chunks/web3-providers-ws"];
exports.modules = {

/***/ "(ssr)/./node_modules/web3-providers-ws/lib/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/web3-providers-ws/lib/esm/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebSocketProvider: () => (/* binding */ WebSocketProvider),\n/* harmony export */   \"default\": () => (/* binding */ WebSocketProvider)\n/* harmony export */ });\n/* harmony import */ var isomorphic_ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic-ws */ \"(ssr)/./node_modules/isomorphic-ws/node.js\");\n/* harmony import */ var web3_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web3-utils */ \"(ssr)/./node_modules/web3-utils/lib/esm/index.js\");\n/* harmony import */ var web3_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-errors */ \"(ssr)/./node_modules/web3-errors/lib/esm/index.js\");\n/*\nThis file is part of web3.js.\n\nweb3.js is free software: you can redistribute it and/or modify\nit under the terms of the GNU Lesser General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nweb3.js is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Lesser General Public License for more details.\n\nYou should have received a copy of the GNU Lesser General Public License\nalong with web3.js.  If not, see <http://www.gnu.org/licenses/>.\n*/\n\n\n\n/**\n * Use WebSocketProvider to connect to a Node using a WebSocket connection, i.e. over the `ws` or `wss` protocol.\n *\n * @example\n * ```ts\n * const provider = new WebSocketProvider(\n * \t\t`ws://localhost:8545`,\n * \t\t{\n * \t\t\theaders: {\n * \t\t\t\t// to provide the API key if the Node requires the key to be inside the `headers` for example:\n * \t\t\t\t'x-api-key': '<Api key>',\n * \t\t\t},\n * \t\t},\n * \t\t{\n * \t\t\tdelay: 500,\n * \t\t\tautoReconnect: true,\n * \t\t\tmaxAttempts: 10,\n * \t\t},\n * \t);\n * ```\n *\n * The second and the third parameters are both optional. And you can for example, the second parameter could be an empty object or undefined.\n *  * @example\n * ```ts\n * const provider = new WebSocketProvider(\n * \t\t`ws://localhost:8545`,\n * \t\t{},\n * \t\t{\n * \t\t\tdelay: 500,\n * \t\t\tautoReconnect: true,\n * \t\t\tmaxAttempts: 10,\n * \t\t},\n * \t);\n * ```\n */\nclass WebSocketProvider extends web3_utils__WEBPACK_IMPORTED_MODULE_1__.SocketProvider {\n    /**\n     * This is a class used for Web Socket connections. It extends the abstract class SocketProvider {@link SocketProvider} that extends the EIP-1193 provider {@link EIP1193Provider}.\n     * @param socketPath - The path to the Web Socket.\n     * @param socketOptions - The options for the Web Socket client.\n     * @param reconnectOptions - The options for the socket reconnection {@link ReconnectOptions}\n     */\n    // this constructor is to specify the type for `socketOptions` for a better intellisense.\n    // eslint-disable-next-line no-useless-constructor\n    constructor(socketPath, socketOptions, reconnectOptions) {\n        super(socketPath, socketOptions, reconnectOptions);\n    }\n    // eslint-disable-next-line class-methods-use-this\n    _validateProviderPath(providerUrl) {\n        return typeof providerUrl === 'string' ? /^ws(s)?:\\/\\//i.test(providerUrl) : false;\n    }\n    getStatus() {\n        if (this._socketConnection && !(0,web3_utils__WEBPACK_IMPORTED_MODULE_1__.isNullish)(this._socketConnection)) {\n            switch (this._socketConnection.readyState) {\n                case this._socketConnection.CONNECTING: {\n                    return 'connecting';\n                }\n                case this._socketConnection.OPEN: {\n                    return 'connected';\n                }\n                default: {\n                    return 'disconnected';\n                }\n            }\n        }\n        return 'disconnected';\n    }\n    _openSocketConnection() {\n        this._socketConnection = new isomorphic_ws__WEBPACK_IMPORTED_MODULE_0__(this._socketPath, undefined, this._socketOptions && Object.keys(this._socketOptions).length === 0\n            ? undefined\n            : this._socketOptions);\n    }\n    _closeSocketConnection(code, data) {\n        var _a;\n        (_a = this._socketConnection) === null || _a === void 0 ? void 0 : _a.close(code, data);\n    }\n    _sendToSocket(payload) {\n        var _a;\n        if (this.getStatus() === 'disconnected') {\n            throw new web3_errors__WEBPACK_IMPORTED_MODULE_2__.ConnectionNotOpenError();\n        }\n        (_a = this._socketConnection) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(payload));\n    }\n    _parseResponses(event) {\n        return this.chunkResponseParser.parseResponse(event.data);\n    }\n    _addSocketListeners() {\n        var _a, _b, _c, _d;\n        (_a = this._socketConnection) === null || _a === void 0 ? void 0 : _a.addEventListener('open', this._onOpenHandler);\n        (_b = this._socketConnection) === null || _b === void 0 ? void 0 : _b.addEventListener('message', this._onMessageHandler);\n        (_c = this._socketConnection) === null || _c === void 0 ? void 0 : _c.addEventListener('close', e => this._onCloseHandler(e));\n        (_d = this._socketConnection) === null || _d === void 0 ? void 0 : _d.addEventListener('error', this._onErrorHandler);\n    }\n    _removeSocketListeners() {\n        var _a, _b, _c;\n        (_a = this._socketConnection) === null || _a === void 0 ? void 0 : _a.removeEventListener('message', this._onMessageHandler);\n        (_b = this._socketConnection) === null || _b === void 0 ? void 0 : _b.removeEventListener('open', this._onOpenHandler);\n        (_c = this._socketConnection) === null || _c === void 0 ? void 0 : _c.removeEventListener('close', this._onCloseHandler);\n        // note: we intentionally keep the error event listener to be able to emit it in case an error happens when closing the connection\n    }\n    _onCloseEvent(event) {\n        var _a;\n        if (this._reconnectOptions.autoReconnect &&\n            (![1000, 1001].includes(event.code) || !event.wasClean)) {\n            this._reconnect();\n            return;\n        }\n        this._clearQueues(event);\n        this._removeSocketListeners();\n        this._onDisconnect(event.code, event.reason);\n        // disconnect was successful and can safely remove error listener\n        (_a = this._socketConnection) === null || _a === void 0 ? void 0 : _a.removeEventListener('error', this._onErrorHandler);\n    }\n}\n\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViMy1wcm92aWRlcnMtd3MvbGliL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDc0M7QUFDaUI7QUFDRjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNlLGdDQUFnQyxzREFBYztBQUM3RDtBQUNBLHNHQUFzRyxzQkFBc0Isb0NBQW9DLHNCQUFzQjtBQUN0TDtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscURBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDBDQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLCtEQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM2QjtBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL215LWFwcC8uL25vZGVfbW9kdWxlcy93ZWIzLXByb3ZpZGVycy13cy9saWIvZXNtL2luZGV4LmpzPzNlNjEiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgZmlsZSBpcyBwYXJ0IG9mIHdlYjMuanMuXG5cbndlYjMuanMgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG50aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxud2ViMy5qcyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbk1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbkdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG5Zb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbmFsb25nIHdpdGggd2ViMy5qcy4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5pbXBvcnQgV2ViU29ja2V0IGZyb20gJ2lzb21vcnBoaWMtd3MnO1xuaW1wb3J0IHsgaXNOdWxsaXNoLCBTb2NrZXRQcm92aWRlciB9IGZyb20gJ3dlYjMtdXRpbHMnO1xuaW1wb3J0IHsgQ29ubmVjdGlvbk5vdE9wZW5FcnJvciB9IGZyb20gJ3dlYjMtZXJyb3JzJztcbi8qKlxuICogVXNlIFdlYlNvY2tldFByb3ZpZGVyIHRvIGNvbm5lY3QgdG8gYSBOb2RlIHVzaW5nIGEgV2ViU29ja2V0IGNvbm5lY3Rpb24sIGkuZS4gb3ZlciB0aGUgYHdzYCBvciBgd3NzYCBwcm90b2NvbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNvbnN0IHByb3ZpZGVyID0gbmV3IFdlYlNvY2tldFByb3ZpZGVyKFxuICogXHRcdGB3czovL2xvY2FsaG9zdDo4NTQ1YCxcbiAqIFx0XHR7XG4gKiBcdFx0XHRoZWFkZXJzOiB7XG4gKiBcdFx0XHRcdC8vIHRvIHByb3ZpZGUgdGhlIEFQSSBrZXkgaWYgdGhlIE5vZGUgcmVxdWlyZXMgdGhlIGtleSB0byBiZSBpbnNpZGUgdGhlIGBoZWFkZXJzYCBmb3IgZXhhbXBsZTpcbiAqIFx0XHRcdFx0J3gtYXBpLWtleSc6ICc8QXBpIGtleT4nLFxuICogXHRcdFx0fSxcbiAqIFx0XHR9LFxuICogXHRcdHtcbiAqIFx0XHRcdGRlbGF5OiA1MDAsXG4gKiBcdFx0XHRhdXRvUmVjb25uZWN0OiB0cnVlLFxuICogXHRcdFx0bWF4QXR0ZW1wdHM6IDEwLFxuICogXHRcdH0sXG4gKiBcdCk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgc2Vjb25kIGFuZCB0aGUgdGhpcmQgcGFyYW1ldGVycyBhcmUgYm90aCBvcHRpb25hbC4gQW5kIHlvdSBjYW4gZm9yIGV4YW1wbGUsIHRoZSBzZWNvbmQgcGFyYW1ldGVyIGNvdWxkIGJlIGFuIGVtcHR5IG9iamVjdCBvciB1bmRlZmluZWQuXG4gKiAgKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNvbnN0IHByb3ZpZGVyID0gbmV3IFdlYlNvY2tldFByb3ZpZGVyKFxuICogXHRcdGB3czovL2xvY2FsaG9zdDo4NTQ1YCxcbiAqIFx0XHR7fSxcbiAqIFx0XHR7XG4gKiBcdFx0XHRkZWxheTogNTAwLFxuICogXHRcdFx0YXV0b1JlY29ubmVjdDogdHJ1ZSxcbiAqIFx0XHRcdG1heEF0dGVtcHRzOiAxMCxcbiAqIFx0XHR9LFxuICogXHQpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlNvY2tldFByb3ZpZGVyIGV4dGVuZHMgU29ja2V0UHJvdmlkZXIge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYSBjbGFzcyB1c2VkIGZvciBXZWIgU29ja2V0IGNvbm5lY3Rpb25zLiBJdCBleHRlbmRzIHRoZSBhYnN0cmFjdCBjbGFzcyBTb2NrZXRQcm92aWRlciB7QGxpbmsgU29ja2V0UHJvdmlkZXJ9IHRoYXQgZXh0ZW5kcyB0aGUgRUlQLTExOTMgcHJvdmlkZXIge0BsaW5rIEVJUDExOTNQcm92aWRlcn0uXG4gICAgICogQHBhcmFtIHNvY2tldFBhdGggLSBUaGUgcGF0aCB0byB0aGUgV2ViIFNvY2tldC5cbiAgICAgKiBAcGFyYW0gc29ja2V0T3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgV2ViIFNvY2tldCBjbGllbnQuXG4gICAgICogQHBhcmFtIHJlY29ubmVjdE9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHNvY2tldCByZWNvbm5lY3Rpb24ge0BsaW5rIFJlY29ubmVjdE9wdGlvbnN9XG4gICAgICovXG4gICAgLy8gdGhpcyBjb25zdHJ1Y3RvciBpcyB0byBzcGVjaWZ5IHRoZSB0eXBlIGZvciBgc29ja2V0T3B0aW9uc2AgZm9yIGEgYmV0dGVyIGludGVsbGlzZW5zZS5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvclxuICAgIGNvbnN0cnVjdG9yKHNvY2tldFBhdGgsIHNvY2tldE9wdGlvbnMsIHJlY29ubmVjdE9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoc29ja2V0UGF0aCwgc29ja2V0T3B0aW9ucywgcmVjb25uZWN0T3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgX3ZhbGlkYXRlUHJvdmlkZXJQYXRoKHByb3ZpZGVyVXJsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvdmlkZXJVcmwgPT09ICdzdHJpbmcnID8gL153cyhzKT86XFwvXFwvL2kudGVzdChwcm92aWRlclVybCkgOiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0U3RhdHVzKCkge1xuICAgICAgICBpZiAodGhpcy5fc29ja2V0Q29ubmVjdGlvbiAmJiAhaXNOdWxsaXNoKHRoaXMuX3NvY2tldENvbm5lY3Rpb24pKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3NvY2tldENvbm5lY3Rpb24ucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5fc29ja2V0Q29ubmVjdGlvbi5DT05ORUNUSU5HOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnY29ubmVjdGluZyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5fc29ja2V0Q29ubmVjdGlvbi5PUEVOOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnY29ubmVjdGVkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnZGlzY29ubmVjdGVkJztcbiAgICB9XG4gICAgX29wZW5Tb2NrZXRDb25uZWN0aW9uKCkge1xuICAgICAgICB0aGlzLl9zb2NrZXRDb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCh0aGlzLl9zb2NrZXRQYXRoLCB1bmRlZmluZWQsIHRoaXMuX3NvY2tldE9wdGlvbnMgJiYgT2JqZWN0LmtleXModGhpcy5fc29ja2V0T3B0aW9ucykubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgOiB0aGlzLl9zb2NrZXRPcHRpb25zKTtcbiAgICB9XG4gICAgX2Nsb3NlU29ja2V0Q29ubmVjdGlvbihjb2RlLCBkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fc29ja2V0Q29ubmVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKGNvZGUsIGRhdGEpO1xuICAgIH1cbiAgICBfc2VuZFRvU29ja2V0KHBheWxvYWQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5nZXRTdGF0dXMoKSA9PT0gJ2Rpc2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBDb25uZWN0aW9uTm90T3BlbkVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5fc29ja2V0Q29ubmVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgIH1cbiAgICBfcGFyc2VSZXNwb25zZXMoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2h1bmtSZXNwb25zZVBhcnNlci5wYXJzZVJlc3BvbnNlKGV2ZW50LmRhdGEpO1xuICAgIH1cbiAgICBfYWRkU29ja2V0TGlzdGVuZXJzKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIChfYSA9IHRoaXMuX3NvY2tldENvbm5lY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgdGhpcy5fb25PcGVuSGFuZGxlcik7XG4gICAgICAgIChfYiA9IHRoaXMuX3NvY2tldENvbm5lY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5fb25NZXNzYWdlSGFuZGxlcik7XG4gICAgICAgIChfYyA9IHRoaXMuX3NvY2tldENvbm5lY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGUgPT4gdGhpcy5fb25DbG9zZUhhbmRsZXIoZSkpO1xuICAgICAgICAoX2QgPSB0aGlzLl9zb2NrZXRDb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLl9vbkVycm9ySGFuZGxlcik7XG4gICAgfVxuICAgIF9yZW1vdmVTb2NrZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAoX2EgPSB0aGlzLl9zb2NrZXRDb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuX29uTWVzc2FnZUhhbmRsZXIpO1xuICAgICAgICAoX2IgPSB0aGlzLl9zb2NrZXRDb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuX29uT3BlbkhhbmRsZXIpO1xuICAgICAgICAoX2MgPSB0aGlzLl9zb2NrZXRDb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLl9vbkNsb3NlSGFuZGxlcik7XG4gICAgICAgIC8vIG5vdGU6IHdlIGludGVudGlvbmFsbHkga2VlcCB0aGUgZXJyb3IgZXZlbnQgbGlzdGVuZXIgdG8gYmUgYWJsZSB0byBlbWl0IGl0IGluIGNhc2UgYW4gZXJyb3IgaGFwcGVucyB3aGVuIGNsb3NpbmcgdGhlIGNvbm5lY3Rpb25cbiAgICB9XG4gICAgX29uQ2xvc2VFdmVudChldmVudCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3RPcHRpb25zLmF1dG9SZWNvbm5lY3QgJiZcbiAgICAgICAgICAgICghWzEwMDAsIDEwMDFdLmluY2x1ZGVzKGV2ZW50LmNvZGUpIHx8ICFldmVudC53YXNDbGVhbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyUXVldWVzKGV2ZW50KTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlU29ja2V0TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuX29uRGlzY29ubmVjdChldmVudC5jb2RlLCBldmVudC5yZWFzb24pO1xuICAgICAgICAvLyBkaXNjb25uZWN0IHdhcyBzdWNjZXNzZnVsIGFuZCBjYW4gc2FmZWx5IHJlbW92ZSBlcnJvciBsaXN0ZW5lclxuICAgICAgICAoX2EgPSB0aGlzLl9zb2NrZXRDb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLl9vbkVycm9ySGFuZGxlcik7XG4gICAgfVxufVxuZXhwb3J0IHsgV2ViU29ja2V0UHJvdmlkZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/web3-providers-ws/lib/esm/index.js\n");

/***/ })

};
;