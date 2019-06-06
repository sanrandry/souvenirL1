/*(function () {
    "use strict";

    if(	window.location.href === "http://www.volkswagen.fr/" || window.location.href === "http://site.volkswagen-preprod.vw.as44099.com/"){
        
        var d = document.getElementsByTagName('html')[0];
    
        var c_exp = new Date();
        c_exp.setTime(c_exp.getTime() + (1*24*60*60*1000));
        c_exp = 'exp='+c_exp.toUTCString();
    
        if(window.location.href.match(/tiguan=1/g) || document.cookie.indexOf("vw_prehome_tiguan=0")===-1) {
                d.style.display = 'none';
                d.style.width = "100%";
                d.style.height = "100%";
                $(document).ready(function(){
                        $('body').css({
                                'height':'100%',
                                'width':'100%',
                                'padding':0,
                                'margin':0
                        });
                        $('body').html('<div style="width:100%;height:100%;position:absolute;left:0;top:0;"><iframe style="position:absolute;top:0;left:0;bottom:0;width:100%;height:100%;" src="http://banniere.vw.as44099.com/2016_05_tiguan/desktop/" marginwidth=0 marginheight=0 frameborder=0></div>');
                        d.style.display = 'block';
                });
                document.cookie = "vw_prehome_tiguan=0;"+c_exp;
        }
    }
        
}());*/