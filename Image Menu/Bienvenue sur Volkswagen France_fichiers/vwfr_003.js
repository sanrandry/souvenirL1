var scriptElemSDS = document.createElement('script');
scriptElemSDS.id = 'sds_load_script';
scriptElemSDS.type = 'text/javascript';
scriptElemSDS.src = '//idm.smart-digital-solutions.com/950/vwfr.js';
scriptElemSDS.async = true;
scriptElemSDS.defer = 'defer';
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] || document.getElementsByTagName('script')[0].parentNode).insertBefore(scriptElemSDS, null);