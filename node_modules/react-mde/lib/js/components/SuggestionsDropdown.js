"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsDropdown = void 0;
var React = require("react");
var ClassNames_1 = require("../util/ClassNames");
var SuggestionsDropdown = function (_a) {
    var classes = _a.classes, suggestions = _a.suggestions, caret = _a.caret, onSuggestionSelected = _a.onSuggestionSelected, suggestionsAutoplace = _a.suggestionsAutoplace, focusIndex = _a.focusIndex, textAreaRef = _a.textAreaRef;
    var handleSuggestionClick = function (event) {
        event.preventDefault();
        var index = parseInt(event.currentTarget.attributes["data-index"].value);
        onSuggestionSelected(index);
    };
    var handleMouseDown = function (event) { return event.preventDefault(); };
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var left = caret.left - textAreaRef.current.scrollLeft;
    var top = caret.top - textAreaRef.current.scrollTop;
    var style = {};
    if (suggestionsAutoplace &&
        top + textAreaRef.current.getBoundingClientRect().top > vh / 2)
        style.bottom = textAreaRef.current.offsetHeight - top;
    else
        style.top = top;
    if (suggestionsAutoplace &&
        left + textAreaRef.current.getBoundingClientRect().left > vw / 2)
        style.right = textAreaRef.current.offsetWidth - left;
    else
        style.left = left;
    return (React.createElement("ul", { className: ClassNames_1.classNames("mde-suggestions", classes), style: style }, suggestions.map(function (s, i) { return (React.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": "" + i }, s.preview)); })));
};
exports.SuggestionsDropdown = SuggestionsDropdown;
