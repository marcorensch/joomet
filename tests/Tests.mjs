import * as assert from 'assert';
import { KeyChecker, ValueChecker, FilenameChecker } from "../src/modules/Checks.mjs";
import FileHelper from "../src/modules/FileHelper.mjs";


describe("FileHelper Checks", ()=>{
    describe("Save Translated File",()=>{
        describe("Should return the filename with replaced Language Information",()=>{
            it(" if language is given",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("en-GB.mod_ext.ini","EN","DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
            it("if language is not given",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("en-GB.mod_ext.ini","AUTO","DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
            it("if language is null",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("en-GB.mod_ext.ini",null,"DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
            it("if language is not given in filename and config",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("mod_ext.ini","AUTO","DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
            it("if language is not given in filename but in config",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("mod_ext.ini","FR","DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
            it("if language is not given in filename but in config as EN",()=>{
                const fh = new FileHelper();
                let filename = fh.buildNewFileName("mod_ext.ini","EN","DE");
                assert.equal(filename,"de-DE.mod_ext.ini");
            });
        })

    })
})

describe("Filename Checks", ()=>{
    describe("Should return true if filename is valid",()=>{
        it("if filename has valid mod format",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.mod_extension_name.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid com format",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.com_extension_name.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid plg format",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.plg_extension_name.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid plg format",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.plg_extension.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid plg format without language information",()=>{
            let res = FilenameChecker.checkFilenameFormat("plg_extension.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid plg sys format without language information",()=>{
            let res = FilenameChecker.checkFilenameFormat("plg_extension.sys.ini");
            assert.equal(res.status,true);
        })
        it("if filename has valid plg sys format with underscores without language information",()=>{
            let res = FilenameChecker.checkFilenameFormat("plg_extension.sys.ini");
            assert.equal(res.status,true);
        })
    })
    describe("Should return false if filename is invalid",()=>{
        it("if extension type is missing",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.ext_.ini");
            assert.equal(res.status,false);
        })
        it("if extension name is uppercase",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.mod_Ext.ini");
            assert.equal(res.status,false);
        })
        it("if extension type is uppercase",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.Mod_ext.ini");
            assert.equal(res.status,false);
        })
        it("if extension type is unsupported",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-GB.foo_ext.ini");
            assert.equal(res.status,false);
        })
        it("if language format is wrong en-gb",()=>{
            let res = FilenameChecker.checkFilenameFormat("en-gb.foo_ext.ini");
            assert.equal(res.status,false);
        })
        it("if language format is wrong EN-gb",()=>{
            let res = FilenameChecker.checkFilenameFormat("EN-gb.foo_ext.ini");
            assert.equal(res.status,false);
        })
    })
})

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