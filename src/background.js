'use strict';

function callback(details){
    var headerIdx = 0;
    var headerLen = details.responseHeaders.length;
    var cspHeaderValue;
    
    for (; headerIdx < headerLen; headerIdx++) {
        if (details.responseHeaders[headerIdx].name === 'Content-Security-Policy') {
            cspHeaderValue = details.responseHeaders[headerIdx].value
            //console.log('old CSP:', details.responseHeaders[headerIdx].value);
            
            cspHeaderValue = cspHeaderValue.replace("frame-src 'self'", "frame-src 'self' https://*.delicious.com")
            //console.log('new CSP:', cspHeaderValue);
            
            details.responseHeaders[headerIdx].value = cspHeaderValue;
        }
    }
    return {
        responseHeaders: details.responseHeaders
    };
}

chrome.webRequest.onHeadersReceived.addListener(
    callback,
    {
        urls : ["*://*.github.com/*", "*://*.github.io/*"],
        types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking", "responseHeaders"]
);