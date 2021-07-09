"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreDb = exports.getLazyIndice = exports.getIndice = exports.Engine = exports.restore = void 0;
var simple_indice_1 = require("full-text-search-server-static-index/dist/simple.indice");
var ngram_indice_1 = require("full-text-search-server-static-index/dist/ngram.indice");
var range_linear_indice_1 = require("full-text-search-server-static-index/dist/range.linear.indice");
var utils_browser_1 = require("full-text-search-server-static-index/dist/utils.browser");
var db_1 = require("full-text-search-server-static-index/dist/db");
var schema_1 = require("full-text-search-server-static-index/dist/schema");
var baseUrl = '/cdn-indice/';
var restore = function (id, dbId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, utils_browser_1.restoreSharedIndices({
                id: id,
                baseUrl: "/cdn-indice/" + dbId,
                deserializeShared: range_linear_indice_1.RangeLinearIndice.lazy,
                deserialize: ngram_indice_1.NgramIndice.deserialize
            })];
    });
}); };
exports.restore = restore;
var Engine;
(function (Engine) {
    Engine["n-gram"] = "n-gram";
    Engine["simple"] = "simple";
})(Engine = exports.Engine || (exports.Engine = {}));
;
var getIndice = function (indice) {
    var _a = indice.type, type = _a === void 0 ? "simple" : _a, options = __rest(indice, ["type"]);
    if (type === "n-gram") {
        return new ngram_indice_1.NgramIndice(options);
    }
    if (type === "simple") {
        return new simple_indice_1.SimpleIndice(options);
    }
    throw new Error("Engine " + type + " not found");
};
exports.getIndice = getIndice;
var getLazyIndice = function (indice) {
    var _a = indice.type, type = _a === void 0 ? "simple" : _a;
    if (type === "n-gram") {
        return ngram_indice_1.NgramIndice.deserialize;
    }
    if (type === "simple") {
        return simple_indice_1.SimpleIndice.deserialize;
    }
    throw new Error("Engine " + type + " not found");
};
exports.getLazyIndice = getLazyIndice;
var getIndicePath = function (indice) {
    var _a = indice.type, type = _a === void 0 ? "simple" : _a, column = indice.column;
    if (column && type === "simple") {
        return column;
    }
    else {
        return "$" + indice.id;
    }
};
var restoreDb = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, indices, indiceInstances, primary, indiceInstancesMap;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("" + baseUrl + id + "/indices." + id + ".json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                indices = _a.sent();
                return [4 /*yield*/, Promise.all(__spreadArray([
                        utils_browser_1.restoreSharedIndices({
                            id: "data." + id,
                            baseUrl: "/cdn-indice/" + id,
                            deserializeShared: range_linear_indice_1.RangeLinearIndice.lazy,
                            deserialize: simple_indice_1.SimpleIndice.deserialize
                        })
                    ], __read(indices.map(function (indice) { return utils_browser_1.restoreSharedIndices({
                        id: indice.id,
                        baseUrl: "/cdn-indice/" + id,
                        deserializeShared: range_linear_indice_1.RangeLinearIndice.lazy,
                        deserialize: exports.getLazyIndice(indice)
                    }); }))))];
            case 3:
                indiceInstances = _a.sent();
                primary = indiceInstances.shift();
                indiceInstancesMap = new Map(indiceInstances.map(function (indice) { return ([indice.id, indice]); }));
                console.log(indiceInstancesMap);
                console.log(indices);
                return [2 /*return*/, new db_1.Db(new schema_1.Schema(primary, indices
                        .map(function (indice) {
                        return ({ indice: indiceInstancesMap.get(indice.id), path: getIndicePath(indice) });
                    })))];
        }
    });
}); };
exports.restoreDb = restoreDb;
//# sourceMappingURL=browser.js.map