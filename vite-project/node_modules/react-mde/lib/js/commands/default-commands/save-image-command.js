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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageCommand = void 0;
var files_1 = require("../../util/files");
var MarkdownUtil_1 = require("../../util/MarkdownUtil");
function dataTransferToArray(items) {
    var result = [];
    for (var index in items) {
        var item = items[index];
        if (item.kind === "file") {
            result.push(item.getAsFile());
        }
    }
    return result;
}
function fileListToArray(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result.push(list[0]);
    }
    return result;
}
function filterItems(items, _a) {
    var multiple = _a.multiple, accept = _a.accept;
    var filteredItems = items;
    if (!multiple) {
        filteredItems = filteredItems.slice(0, 1);
    }
    if (accept) {
        //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
        var acceptedTypes = accept.split(",");
        var fileExtensions_1 = new Set(acceptedTypes.filter(function (t) { return /^\.\w+/.test(t); }).map(function (t) { return t.split(".")[1]; }));
        var mimeTypes_1 = new Set(acceptedTypes.filter(function (t) { return /^[-\w.]+\/[-\w.]+$/.test(t); }));
        var anyTypes_1 = new Set(acceptedTypes
            .filter(function (t) { return /(audio|video|image)\/\*/.test(t); })
            .map(function (t) { return t.split("/")[0]; }));
        filteredItems = filteredItems.filter(function (f) {
            return fileExtensions_1.has(f.name.split(".")[1]) ||
                mimeTypes_1.has(f.type) ||
                anyTypes_1.has(f.type.split("/")[0]);
        });
    }
    return filteredItems;
}
exports.saveImageCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi, context = _a.context, l18n = _a.l18n;
        return __awaiter(this, void 0, void 0, function () {
            var pasteContext, event, _b, saveImage, multiple, accept, items, filteredItems, _c, _d, _i, index, initialState_1, breaksBeforeCount, breaksBefore, placeHolder, blob, blobContents, savingImage, imageUrl, newState, uploadingText, realImageMarkdown, selectionDelta;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!context) {
                            throw new Error("wrong context");
                        }
                        pasteContext = context;
                        event = pasteContext.event, _b = pasteContext.pasteOptions, saveImage = _b.saveImage, multiple = _b.multiple, accept = _b.accept;
                        items = isPasteEvent(context)
                            ? dataTransferToArray(event.clipboardData.items)
                            : isDragEvent(context)
                                ? dataTransferToArray(event.dataTransfer.items)
                                : fileListToArray(event.target.files);
                        filteredItems = filterItems(items, { multiple: multiple, accept: accept });
                        _c = [];
                        for (_d in filteredItems)
                            _c.push(_d);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _c.length)) return [3 /*break*/, 5];
                        index = _c[_i];
                        initialState_1 = textApi.getState();
                        breaksBeforeCount = MarkdownUtil_1.getBreaksNeededForEmptyLineBefore(initialState_1.text, initialState_1.selection.start);
                        breaksBefore = Array(breaksBeforeCount + 1).join("\n");
                        placeHolder = breaksBefore + "![" + l18n.uploadingImage + "]()";
                        textApi.replaceSelection(placeHolder);
                        blob = items[index];
                        return [4 /*yield*/, files_1.readFileAsync(blob)];
                    case 2:
                        blobContents = _e.sent();
                        savingImage = saveImage(blobContents, blob);
                        return [4 /*yield*/, savingImage.next()];
                    case 3:
                        imageUrl = (_e.sent()).value;
                        newState = textApi.getState();
                        uploadingText = newState.text.substr(initialState_1.selection.start, placeHolder.length);
                        if (uploadingText === placeHolder) {
                            // In this case, the user did not touch the placeholder. Good user
                            // we will replace it with the real one that came from the server
                            textApi.setSelectionRange({
                                start: initialState_1.selection.start,
                                end: initialState_1.selection.start + placeHolder.length
                            });
                            realImageMarkdown = imageUrl
                                ? breaksBefore + "![image](" + imageUrl + ")"
                                : "";
                            selectionDelta = realImageMarkdown.length - placeHolder.length;
                            textApi.replaceSelection(realImageMarkdown);
                            textApi.setSelectionRange({
                                start: newState.selection.start + selectionDelta,
                                end: newState.selection.end + selectionDelta
                            });
                        }
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
function isPasteEvent(context) {
    return (context.event
        .clipboardData !== undefined);
}
function isDragEvent(context) {
    return (context.event.dataTransfer !==
        undefined);
}
