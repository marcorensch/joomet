import * as assert from 'assert';
import { KeyChecker, ValueChecker } from "../src/classes/Checks.mjs";

describe('Key Checks', () => {
    describe('allUppercase', () => {
        it('All uppercase check should return true for MY_KEY', function () {
            let t = KeyChecker.allUppercase("MY_KEY")
            assert.equal(t.status, true);
        });
        it('All uppercase check should return false for My_Key', function () {
            let t = KeyChecker.allUppercase("My_Key")
            assert.equal(t.status, false);
        });
    })
})

describe("Value Checks", () => {
    describe("Balanced HTML TAGS", () => {
        it("Should return true for <div></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div></div>")
            assert.equal(t.status, true);
        });
        it("Should return true for <b></b>", function () {
            let t = ValueChecker.balancedHtmlTags("<b></b>")
            assert.equal(t.status, true);
        });
        it("Should return true for <br>", function () {
            let t = ValueChecker.balancedHtmlTags("<br>")
            assert.equal(t.status, true);
        });
        it("Should return false for <div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div>")
            assert.equal(t.status, false);
        });
        it("Should return false for <div></span>", function () {
            let t = ValueChecker.balancedHtmlTags("<div></span>")
            assert.equal(t.status, false);
        });
        it("Should return false for </span><div>", function () {
            let t = ValueChecker.balancedHtmlTags("</span><div>")
            assert.equal(t.status, false);
        });
        it("Should return true for <body><div><p><bold></bold></p></div></body>", function () {
            let t = ValueChecker.balancedHtmlTags("<body><div><p><bold></bold></p></div></body>")
            assert.equal(t.status, true);
        });
        it("Should return true for <div class='div-classes' uk-cover><p class=\"pargraph\"><strong></strong></p></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div class='div-classes' uk-cover><p class=\"pargraph\"><strong></strong></p></div>")
            assert.equal(t.status, true);
        });
        it("Should return false for <body></div><p><bold></bold></p></div></body>", function () {
            let t = ValueChecker.balancedHtmlTags("<body></div><p><bold></bold></p></div></body>")
            assert.equal(t.status, false);
        });
        it("Should return false for <div><span><b></span></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div><strong></span></div>")
            assert.equal(t.status, false);
        });
        it("Should return true for <div>span</div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div>span</div>")
            assert.equal(t.status, true);
        });
        it("Should return true for <div><img href='img.png' title='foo'></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div><img href='img.png' title='foo'></div>")
            assert.equal(t.status, true);
        });
        it("Should return true for <div><img href=\"img.png\" title=\"foo\"></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div><img href=\"img.png\" title=\"foo\"></div>")
            assert.equal(t.status, true);
        });
        it("Should return true for <div>span div </div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div>span div </div>")
            assert.equal(t.status, true);
        });
        it("Should return false for <div><span><p></div>", function () {
            let t = ValueChecker.balancedHtmlTags("<div><span><p></div>")
            assert.equal(t.status, false);
        });
        it("Should return true for <h2><span class='icon-tags-2 large-icon'> </span> Tags Display</h2>", function () {
            let t = ValueChecker.balancedHtmlTags("<span class='foo'></span><br>")
            assert.equal(t.status, true);
        });
    })
})