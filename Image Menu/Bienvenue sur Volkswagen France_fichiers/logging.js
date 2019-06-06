// Sophus Ltd 201607201455m

function s3load(path, script){
    var scriptEl = document.createElement('script');
    var scriptLst = document.getElementsByTagName('script')[0];
    
    if (typeof script === 'undefined') script = 'logging.js';
    scriptEl.type = 'text/javascript';
    scriptEl.async = true;
    scriptEl.src = '//scripts.sophus3.com/' + path + '/' + script;
    scriptLst.parentNode.insertBefore(scriptEl, scriptLst);
}

function s3select() {
    var domain = document.location.hostname;
    var enddomain = domain.substring(domain.lastIndexOf('.') + 1);
    var pathN = document.location.pathname;
    
    enddomain = enddomain.toLowerCase();

	if (domain ===  'www.volkswagen-vans.co.uk') {//uk vans 
        s3load('s3s/vw/uk/van');
    } else if(enddomain === 'fr') {
        try{
            if(typeof s3_loader !== "undefined" && s3_loader){
                return;
            }else{
                s3load('s3s/vw/fr');
            }
        }catch(err){

        }
    }else {
        s3load('s3s/vw/int');
    }
}

s3select();