/*!
 * Copyright(c) 2014 Jan Blaha
 */

module.exports = function (reporter, definition) {
  reporter.extensionsManager.engines.push({
    name: 'jsrender',
    pathToEngine: require('path').join(__dirname, 'jsrenderEngine.js')
  })
}
