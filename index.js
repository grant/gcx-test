"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
var gcx = require('gcx');
var _a = require('fs'), readdirSync = _a.readdirSync, lstatSync = _a.lstatSync;
var CREDS_FILE_LOCATION = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
var CREDS_FILE = require(CREDS_FILE_LOCATION);
console.log("Using creds: " + CREDS_FILE_LOCATION);
var REGION = 'us-central1';
var PROJECT_ID = CREDS_FILE.project_id;
/**
 * Deploys a cloud function.
 * @param {string} name The title of the function endpoint.
 * @param {string} entryPoint The function name.
 * @param {string} targetDir The path to the source directory.
 * @example
 */
var deploy = function (_a) {
    var name = _a.name, entryPoint = _a.entryPoint, targetDir = _a.targetDir;
    return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Deploying " + name + "...");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gcx.deploy({
                            name: name,
                            region: REGION,
                            runtime: 'nodejs8',
                            targetDir: targetDir,
                            description: 'test desc',
                            retry: true,
                            // maxInstances: 10, Alpha feature that needs whitelisting
                            triggerHTTP: true,
                            triggerEvent: 'http',
                            entryPoint: entryPoint,
                            project: PROJECT_ID,
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.log("Errors: " + e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/**
 * Lists the exported functions in a file.
 * @param {string} filename The file.
 * @returns {string[]} A list of function names.
 */
var listFunctions = function (filename) {
    var fns = require(filename);
    var fnNames = Object.keys(fns);
    return fnNames;
};
/**
 * Gets a list of directories within the functions directory.
 * @returns {string[]} A list of paths to directories.
 */
var BASE_DIR = './functions';
var getFunctionDirectories = function () {
    var directories = [];
    readdirSync(BASE_DIR).map(function (subdir) {
        var dir = BASE_DIR + "/" + subdir;
        if (lstatSync(dir).isDirectory()) {
            directories.push(subdir);
        }
    });
    return directories;
};
/**
 * Deploys all functions in all directories.
 */
var deployAll = function () { return __awaiter(_this, void 0, void 0, function () {
    var functionDirectories;
    var _this = this;
    return __generator(this, function (_a) {
        functionDirectories = getFunctionDirectories();
        functionDirectories.map(function (directory) {
            var absoluteDir = BASE_DIR + "/" + directory;
            var functionNames = listFunctions(absoluteDir);
            functionNames.map(function (functionName) { return __awaiter(_this, void 0, void 0, function () {
                var name;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = directory + "-" + functionName;
                            return [4 /*yield*/, deploy({
                                    name: name,
                                    entryPoint: functionName,
                                    targetDir: absoluteDir,
                                })];
                        case 1:
                            _a.sent();
                            console.log(getURL(name));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        return [2 /*return*/];
    });
}); };
/**
 * Gets the HTTP trigger URL for the Cloud Function
 * @param {string} functionName The function name.
 */
var getURL = function (functionName) {
    return "https://" + REGION + "-" + PROJECT_ID + ".cloudfunctions.net/" + functionName;
};
/**
 * Tests the fn directories.
 */
var testFnDirs = function () {
    var functionDirectories = getFunctionDirectories();
    functionDirectories.map(function (directory) {
        var fns = listFunctions(directory);
        console.log("- " + directory + ": [" + fns + "]");
    });
};
// testFnDirs();
deployAll();
