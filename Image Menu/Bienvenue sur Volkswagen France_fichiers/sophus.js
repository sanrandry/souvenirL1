
/*------------------------*/
/*------------------------*/
/*------------------------*/
/*-------------------------SOPHUS-SOPHUS-SOPHUS-SOPHUS-SOPHUS----*/
/*------------------------*/
/*------------------------*/
/*------------------------*/

// Copyright (c) Sophus Ltd 2014
(function () {
    function async_load() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//scripts.sophus3.com/s3s/vw/fr/logging.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();

//--><!]]>

