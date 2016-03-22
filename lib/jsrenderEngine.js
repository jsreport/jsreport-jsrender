/*!
 * Copyright(c) 2014 Jan Blaha
 */

var regex = /<script[^>]*id=["'](.*?)["'].*type=["']text\/x-jsrender['"][^>]*?>([\s\S]*?)<\/script>/gi;
var jsrender = require('jsrender');

module.exports = function (html, helpers, data) {
  //load <script id="columnTemplate" type="text/x-jsrender"> ... </script> jsrender child templates
  var subtemplates = {};
  html = html.replace(regex, function(subtemplate, name, markup) {
    subtemplates[name] = markup;  // Add subtemplate markup to subtemplates hash
    return "";                    // Remove nested subtemplate declarations from html
  });

  var tmpl = jsrender.templates(html || " ");     // Compile main template
  jsrender.templates(subtemplates, tmpl);         // Compile named subtemplates, scoped to main template
  var result = tmpl.render(data || {}, helpers);  // Render to string
  return result;
};