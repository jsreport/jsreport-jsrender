var should = require("should");
var jsrender = require("../lib/jsrenderEngine");

describe('jsrender', function(){

  it('should render html', function () {
    var html = jsrender("Hey", null, null);
    html.should.be.eql("Hey");
  });

  it('should be able to use helpers', function () {
    var html = jsrender("{{>~a()}}", { a: function() { return "Hey"; } }, null);
    html.should.be.eql("Hey");
  });

  it('should be able to use data', function () {
    var html = jsrender("{{:a}}", null, { a: "Hey" });
    html.should.be.eql("Hey");
  });

  it('should throw when missing helper', function () {
    should(function() {
      jsrender("{{:~missing()}}", null, {});
    }).throw();
  });

  it('should throw when syntax error', function () {
    should(function() {
      jsrender("{{:~missing()}}", null, {});
    }).throw();
  });

  it('should be able to parse and use sub tempates', function () {
    var childTemplate = "<script id=\"inner\" type=\"text/x-jsrender\">{{:#data}}</script>";
    var template = "{{for items tmpl=\"inner\"}}{{/for}}";
    var html = jsrender(childTemplate + template, null, { items : [1,2,3]});
    html.should.be.eql("123");
  });

  it('should be able to parse and use multiple sub tempates', function () {
    var childTemplate = "<script id=\"inner\" type=\"text/x-jsrender\">{{:#data}}</script>\n<script id=\"inner2\" type=\"text/x-jsrender\">a{{:#data}}</script>";
    var template = "{{for items tmpl=\"inner\"}}{{/for}}{{for items tmpl=\"inner2\"}}{{/for}}";
    var html = jsrender(childTemplate + template, null, { items : [1,2,3]});
    html.should.be.eql("\n123a1a2a3");
  });
});