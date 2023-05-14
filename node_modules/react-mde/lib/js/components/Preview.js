"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preview = void 0;
var React = require("react");
var ClassNames_1 = require("../util/ClassNames");
var Preview = /** @class */ (function (_super) {
    __extends(Preview, _super);
    function Preview(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loading: true
        };
        return _this;
    }
    Preview.prototype.componentDidMount = function () {
        this.generatePreview();
    };
    Preview.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.markdown !== prevProps.markdown) {
            this.generatePreview();
        }
    };
    Preview.prototype.generatePreview = function () {
        var _this = this;
        var _a = this.props, markdown = _a.markdown, generateMarkdownPreview = _a.generateMarkdownPreview;
        generateMarkdownPreview(markdown).then(function (preview) {
            _this.setState({
                preview: preview,
                loading: false
            });
        });
    };
    Preview.prototype.render = function () {
        var _a = this.props, classes = _a.classes, minHeight = _a.minHeight, loadingPreview = _a.loadingPreview, refObject = _a.refObject, heightUnits = _a.heightUnits;
        var _b = this.state, preview = _b.preview, loading = _b.loading;
        var finalHtml = loading ? loadingPreview : preview;
        var content;
        if (typeof finalHtml === "string") {
            content = (React.createElement("div", { className: "mde-preview-content", dangerouslySetInnerHTML: { __html: finalHtml || "<p>&nbsp;</p>" }, ref: refObject }));
        }
        else {
            content = React.createElement("div", { className: "mde-preview-content" }, finalHtml);
        }
        var minHeightVal = minHeight && heightUnits ? minHeight + 10 + heightUnits : minHeight + 10;
        return (React.createElement("div", { className: ClassNames_1.classNames("mde-preview", classes, { loading: loading }), style: { minHeight: minHeightVal }, "data-testid": "mde-preview" }, content));
    };
    return Preview;
}(React.Component));
exports.Preview = Preview;
