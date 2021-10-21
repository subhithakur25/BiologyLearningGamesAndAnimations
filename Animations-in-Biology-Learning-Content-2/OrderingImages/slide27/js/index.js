var iframeResize = require('./iframeResizer')

exports.iframeResize = iframeResize
exports.iframeResizer = iframeResize // Backwards compatability
exports.iframeResizerContentWindow = require('./iframeResizer.contentWindow')

var sorting = require('./sorting')