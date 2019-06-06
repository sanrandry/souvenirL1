/**
 * Created with JetBrains WebStorm.
 * User: daniel.osthues
 * Date: 03.01.14
 * Time: 11:55
 * <script src='//www.grmtech.net/u/deb721f55cd5e9094ce72b3b960b61f181dz2835.js' async defer><script>
 * To change this template use File | Settings | File Templates.
 */

(
    /*
    * Self extracting anonymous function
    */
    function()
    {       
            /**
            /* Check if a Versatag has already been created if not create one from scratch
            **/
            if(!window.versaTagObj)
            {
                /**
                /* Create an object called versaTag
                /* @var {object} versaTag
                **/
                window.versaTag = {};
                window.versaTag.id = "3539";
                window.versaTag.sync = 0;
                window.versaTag.dispType = "js";
                window.versaTag.ptcl = "HTTPS";
                window.versaTag.bsUrl = "bs.serving-sys.com/BurstingPipe";
                window.versaTag.activityParams = {"OrderID":"","Session":"","Value":"","productid":"","productinfo":"","Quantity":""};
                window.versaTag.retargetParams = {};
                window.versaTag.dynamicRetargetParams = {};
                window.versaTag.conditionalParams = {};
                var s = document.createElement('script');
                s.src = "https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js";
                s.id = "ebOneTagUrlId";
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
            }
            
            /**
            /* Create an object called versaTag
            /* @var {object} GRM the GRM namespace object
            **/
            window.GRM = window.GRM || {};
            /**
            /* Create an object called versaTag
            /* @member {object} grmObserver create the grmObserver object
            **/
            window.GRM.grmObserver = window.GRM.grmObserver || new function GRMObserver()
            {
                //@private observeableList : List of observer functions to be registered
                var observeableList = {};
                //@member {object} vendorIDs : holds the last used ID for the certain vendor
                var vendorIDs = {};
                //@member {object} versatagMappingRules : used for the mapping from the incoming status - & event - string to Versatag String
                var versatagMappingRules = {};
                //@member {string} actualMappingStrign : hold a copy of the last incoming status string
                var actualMappingString = "";
                //@member {boolean} inInDebugMode : determines if debug mode is on or not
                var isInDebugMode = document.location.href.indexOf("opentag_debug_tool") > -1;
                //@member states {array} Add the states - Array to the versatagMappingRules - Object and fill it 
                versatagMappingRules.states = [];
                versatagMappingRules.states.push({key : "Trimline", value : "trimlevel"});
                versatagMappingRules.states.push({key : "Model", value : "model"});
                versatagMappingRules.states.push({key : "Model : Efficiency : on page leave", value : "efficiency"});
                versatagMappingRules.states.push({key : "Colour", value : "colour"});
                versatagMappingRules.states.push({key : "Wheels", value : "wheels"});
                versatagMappingRules.states.push({key : "Options", value : "options"});
                versatagMappingRules.states.push({key : "Summary", value : "summary"});
                versatagMappingRules.states.push({key : "testdrive", value : "lead_testdrive"});
                versatagMappingRules.states.push({key : "offer", value : "lead_offer"});
                versatagMappingRules.states.push({key : "Interior", value : "interior"});
                versatagMappingRules.states.push({key : "Engine", value : "engine"});
                versatagMappingRules.states.push({key : "New-Which", value : "which-model"});
                versatagMappingRules.states.push({key : "New-Explore", value : "explore"});
                versatagMappingRules.states.push({key : "New-Home", value : "home"});
                versatagMappingRules.states.push({key : "Offers", value : "offers"});
                versatagMappingRules.states.push({key : "Fleet", value : "fleet"});
                versatagMappingRules.states.push({key : "Finance-Calculator", value : "financeCalculator"});
                //versatagMappingRules.states.push({key : "Book-a-testdrive", value : "book-a-test-drive"});
                versatagMappingRules.states.push({key : "Book-a-testdrive-What", value : "book-a-test-drive-what"});
                versatagMappingRules.states.push({key : "Book-a-testdrive-When", value : "book-a-test-drive-when"});
                versatagMappingRules.states.push({key : "Book-a-testdrive-Where", value : "book-a-test-drive-where"});
                versatagMappingRules.states.push({key : "Book-a-testdrive-Who", value : "book-a-test-drive-who"});
                versatagMappingRules.states.push({key : "Service-booking", value : "service-booking"});
                versatagMappingRules.states.push({key : "Retailers", value : "find-a-retailer"});
                versatagMappingRules.states.push({key : "Brochures", value : "brochures"});
                versatagMappingRules.states.push({key : "Used-cars-search", value : "used-cars-search"});
				versatagMappingRules.states.push({key : "current-page", value : ""});
                //@member {array} Add the events - Array to the versatagMappingRules - Object and fill it
                versatagMappingRules.events = [];
                versatagMappingRules.events.push({key : "FT", value : "finished"});
                versatagMappingRules.events.push({key : "BC", value : "begin_configuration"});
                versatagMappingRules.events.push({key : "TS", value : "trimlevel_selected"});
                versatagMappingRules.events.push({key : "SC", value : "sufficient_configuration"});

                /**
                /* @public addObserver
                /* @this GRMObserver
                /* Adds any function instance that is received and adds it as an observer to the list of observers
                /* @param cb : The callback
                /* @param filter : The filter the callback is registered to
                /* @param vendor : The vendor the callback is from ( Sizmek, AppNexus, Quisma ... )
                /* @param tagId : The part of the Vendor's tag that has to be dynamic. Mostly it's the id.
                /* @param oneShot : Fire the tag only once or not
                **/
                this.addObserver = function(cb,filter,vendor, tagId, oneShot)
                {
                    //If the URL already maps to the filter then ... 
                    //...If oneShot is activated --> Simply fire the tag and do nothing else
                    if(oneShot && (filter === actualMappingString))
                    {
                        vendorIDs[vendor] = tagId;
                        cb();
                        return;
                    }
                    //... If oneShot is deactivated --> fire the event but also walk through the rest of the procedure
                    if(!oneShot && (filter === actualMappingString))
                    {
                        vendorIDs[vendor] = tagId;
                        cb();
                    }
                    //add the observer to the list by mapping the function callback to the filter
                    if(!observeableList[filter])
                    {
                        observeableList[filter] = {callbacks : []};
                    }
                    
                    observeableList[filter]["callbacks"].push({callback : cb, vendor : vendor, tagId : tagId, oneShot : oneShot});
                };

                /**
                /* @public notifyObserver 
                /* @this GRMObserver
                /* Notify the Observerver using any amount of parameters. Using "args" ( line 80) you will be able to grab all of them
                /* Example implementation : GRM.grmObserver.notifyObserver("testdrive","start",Polo)
                **/
                this.notifyObserver = function()
                {
                    var params = []
                    var len = arguments.length;
                   
                    if(isInDebugMode)console.log("-----------------------------------------------------args start");
                    var argsArr = [];
                    for(var i = 0; i < len; i++)
                    {
                        var arg = arguments[i];
                        if(isInDebugMode)console.log(arg);
                        if(typeof arg === "object")
                        {
                            var parsedArr = parseObjectToParams(arg)
                            params = params.concat(parsedArr);
                        }
                        else
                        {
                            argsArr.push(arg);
                        }
                    }
                    
                    actualMappingString = argsArr.join("|");

                    if(isInDebugMode)console.log("---String to filter for :"+actualMappingString);
                    if(isInDebugMode)console.log("-----------------------------------------------------args end");
                    notifyVendorObserver(actualMappingString);
                    notifyVersatag(actualMappingString,params);
                }
                
                /**
                /* @public getObserver
                /* @this GRMObserver
                /* @returns {object} the observeableList
                **/
                this.getObserver = function()
                {
                    return observeableList;
                }
                
                /**
                /* @public getCurrentVendorTagId
                /* @this GRMObserver
                /* @param {string} the name of a specific Vendor ( Sizmek, AppNexus ...)
                /* @returns {string} the last used Tag-Id for the respective Vendor
                **/
                this.getCurrentVendorTagId = function(vendorId)
                {
                    return vendorIDs[vendorId] || "";
                }
                
                /**
                /* @private notifyVendorObserver
                /* Notify all Vendor Observers coming from the Qubit implementation, handle oneShot callbacks and rebuild the appropriate Array 
                /* @param str : The string used to notify the Vendor Observers
                **/
                var notifyVendorObserver = function(str)
                {
                    if(observeableList[str])
                    {
                        var arr = observeableList[str]["callbacks"];
                        var tempArr = [];
                        for(j = 0; j < arr.length; j++)
                        {
                            var callbackObj = arr[j];
                            vendorIDs[callbackObj.vendor] = callbackObj.tagId;
                            callbackObj.callback();
                            if(!callbackObj.oneShot)
                            {
                               tempArr.push(callbackObj);      
                            }
                        }
                        //observeableList[str]["callbacks"] = tempArr;
                    }
                }                

				/**
				/* @private notifyVersatag
				/* Notify the Versatag thats instantiated before. 
				/* @param str : The String used for the notification
				/* @param params : additional, optional parameters 
				**/
				var notifyVersatag = function(str, params)
				{
					// Wait for versaTagObj to be created
					var intrvl = setInterval(function(){
						var available = window.versaTagObj;
						if(available) {
							clearInterval(intrvl);
							//@member lenStates : temporary save length of the versatagMappingRules.states Array
							var lenStates = versatagMappingRules.states.length;
							//@member lenStates : temporary save length of the versatagMappingRules.events Array
							var lenEvents = versatagMappingRules.events.length
							//@member mappedState : Holds the current mapped state
							var mappedState = "";
							//@member mapped Event : Holds the current mapped Event
							var mappedEvent = ""
							//@member : Holds the current request 
							var req = ""
							var i;

							// Loop through all possible states until either a match occurs or nothing is found 
							for(i = 0; i < lenStates; i++)
							{
								var s = versatagMappingRules.states[i]["key"];
								if(str.indexOf(s) > -1)
								{
									mappedState = (s==="current-page")?location.pathname.substring(1):versatagMappingRules.states[i]["value"];
								}
							}

							// Loop through all possible events until either a match occurs or nothing is found 
							for(i = 0; i < lenEvents; i++)
							{
								var s = versatagMappingRules.events[i]["key"];
								if(str.indexOf(s) > -1)
								{
									mappedEvent = versatagMappingRules.events[i]["value"];
								}
							}

							// if a state string is found --> mappedState != "" start building the request
							if(mappedState != "")
							{
								// if versatagObj is available ... 
								if(window.versaTagObj)
								{
									// clear all activity - specific parameters first ... 
									window.versaTagObj.clearActivityParam();
									if(params && params.length > 0)
									{
										//loop through all activity parameters
										var lenParams = params.length;
										for(var i = 0; i < lenParams; i++)
										{
											var subArr = params[i]
											window.versaTagObj.setActivityParam(subArr[0],subArr[1]);
										}
									}
									//build up the request --> protocol + // + host + state + optional event 
									req = location.protocol+"//"+location.host+"/"+mappedState+(mappedEvent != "" ? "/"+mappedEvent : "");
									window.versaTagObj.generateRequest(req);
								}
							}
						}
					},50);
				}

                /**
                /* @private parseObjectToParams
                /* parses Object to Array and return it 
                /* @param {object} obj : The object to be parsed
                /* @returns {array} the received object parsed to a multidimensional Array --> [["color","blue"],["wheels",1],[...,...]];
                **/
                var parseObjectToParams = function(obj)
                {
                    var p = []
                    for (var prop in obj) 
                    {
                        if (obj.hasOwnProperty(prop)) 
                        {
                            p.push([encodeURIComponent(prop),encodeURIComponent(obj[prop])]);
                        }
                    }
                    return p; 
                }
            }

            /**
            /* Create an object called cloudFront
            /* @var {object} cloudFront the cloudFront Object
            **/
            window.GRM.cloudFront = window.GRM.cloudFront || new function CloudFront()
            {
                //@member path {string} the static path of the cloudfront URL
                var path = '//d3c3cq33003psk.cloudfront.net/opentag-';
                //@member extension {string} the extension in this case js ( javascript )
                var extension = '.js';
                //@member map {array} the list of available mappings
                var map = [];
                //Fill the map with objects each containing a regExpr and a trackingID property
                map.push( {regExpr :/partner\.volkswagen\.de/, trackingID : "66627-1165171"});
                // --> volkswagen.klingt-gut.de
                map.push( {regExpr :/volkswagen\.klingt-gut\.de/, trackingID : "66627-1534927"});
                // --> klingt-gut.de
                map.push( {regExpr :/klingt-gut\.de/, trackingID : "66627-1534927"});
                map.push({regExpr :/dasweltauto\.es/, trackingID : "99555-1607857"});
				// --> volkswagen-allstar.de
                map.push( {regExpr :/volkswagen-allstar\.de/, trackingID : "66627-2104590"});
				// --> webspecial.volkswagen-allstar.de
				map.push( {regExpr :/webspecial\.volkswagen-allstar\.de/, trackingID : "66627-2104590"});
                //Special local volkswagen subpages ( for example http://www.volkswagen-polo.com/es )
                // --> com.au
                map.push({regExpr :/culture\=es_ES/, trackingID : "99555-1251102"});
                // --> com.au
                map.push({regExpr :/.\.com\.au/, trackingID : "100264-1260858"});
                //--> com.my
                map.push({regExpr :/.\.com\.my/, trackingID : "97538-1188630"});
                //com/es
                map.push({regExpr :/.\.com\/es/, trackingID : "99555-1251102"});
                //--> .com/fr
                map.push({regExpr :/.\.com\/fr\//, trackingID : "118219-1605462"});
                //-->fr/fr/
                map.push({regExpr :/fr\/fr\//, trackingID : "118219-1605462"});
                //domain based switches
                //For the new de - Container uncomment the line below
                //regExMapCF.add({regExpr :/.\.de/, trackingID : "66627-2104590"});
                map.push({regExpr :/.\.de/, trackingID : "66627-2104590"});

                //... and deactivate the following line
                //map.push({regExpr :/.\.de/, trackingID : "66627-474839"});

                map.push({regExpr :/.\.fr/, trackingID : "118219-1605462"});
                map.push({regExpr :/.\.com/,trackingID : "66627-2104590"});
                map.push({regExpr :/.\.ie/, trackingID : "89052-949122"});
                map.push({regExpr :/.\.no/, trackingID : "90652-1000803"});
                map.push({regExpr :/.\.ru/, trackingID : "93700-1081087"});
                map.push({regExpr :/.\.se/, trackingID : "94437-1105037"});
                map.push({regExpr :/.\.es/, trackingID : "99555-1251102"});
                //map.push({regExpr :/.\.ch/, trackingID : "53298-1289629"});
                map.push({regExpr :/.\.pt/, trackingID : "98032-1204791"});
		        map.push({regExpr :/.\.uk/, trackingID : "115172-2020701"});
                
                /**
                /* @private find
                /* finds the appropriate Qubit - id for a certain url
                /* @param url {string} a URL
                /* @returns the specific Qubit id for a given URL
                **/
                var find = function(url)
                {
                    var len = map.length;
                    for( var i = 0; i < len; i++)
                    {
                        var obj = map[i];
                        var reg = obj.regExpr;

                        var t = reg.test(url);

                        if(reg.test(url))
                        {
                            return obj.trackingID;
                        }
                    }
                    return "";
                }
                
                /**
                /* @private receiveSnippet
                /* Builds up the Qubit path to a certain container
                /* @param tagID {string}
                /* @returns the specific Qubit path for a given tagId
                **/
                var receiveSnippet = function(tagID)
                {
                    if(!tagID)
                    {
                        return;
                    }

                    return path + tagID + extension
                }
                
                /**
                /* @public writeSnippet
                /* @this CloudFront
                /* Builds up the Qubit tag dynamically and adds it to the site
                /* @param url {string} the URL to the Qubit-Tag including the dynamic part of it ( the tag Id )
                **/
                this.writeSnippet = function(url)
                {
                    if(url === "" || url === undefined)return;  
                    var trackingId = find(url);
                    if(trackingId === "") return;
                    var src = receiveSnippet(trackingId);
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = src;
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
                }
            };
			GRM.cloudFront.writeSnippet(window.location.href);
		
			/**
			/* for configurator on http://app.volkswagen.com.ar/
			/* add click events to testdrive and budget buttons to fire versaTag Request
			/*
			**/
			(function (){
				var getCarModel = function() {
				
				var mapping = [
					{id: '30360', name: 'fox'},
					{id: '30370', name: 'golf'},
					{id: '30501', name: 'golf-variant'},
					{id: '30701', name: 'beatle'},
					{id: '30906', name: 'vento'},
					{id: '31690', name: 'tiguan'},
					{id: '72003', name: 'amarok'}
				];	
				
				for (var i = 0; i < mapping.length; i++) {
					var value = mapping[i];
					if(window.location.href.indexOf(value.id) > -1) return value.name;
				}

				return "unknown";
				}

				var f = false;
				var g = false;

				var ae = function (i, rtype) {
					i.addEventListener("click", function() {
						var model = getCarModel();
						if(model !== null) {
							window.versaTagObj.generateRequest("https://www.volkswagen.com.ar/"+model+"-"+rtype);
						}		
					});
				};

				var d = function () {
					// only ARG
					if(window.location.href.indexOf("app.volkswagen.com.ar") > -1 
					  && document.getElementsByClassName("ctaPrimary").length 
					  && document.getElementsByClassName("ctaPrimary")[0].offsetHeight > 0) {
						if (!f) {
							var requestDrives = document.querySelectorAll("[data-type-action=requestDrive]");
							if (requestDrives.length) {
								for (var i = 0; i < requestDrives.length; i++) ae(requestDrives[i], "testdrive");
								f = true;
							}
						}
						
						if (!g) {		
							var requestQuote = document.querySelectorAll("[data-type-action=requestQuote]");
							if (requestQuote.length) {
								for (var i = 0; i < requestQuote.length; i++) ae(requestQuote[i], "budget");
								g = true;
							}
						}
					}
				};
				setInterval(d, 500);
			})();
            
            /**
			/* for contact form on http://app-ssl.volkswagen.com.ar/
			/* add click events to submit button to fire versaTag Request
			/* with car model name
			**/
            (function () {
                var getCarModel = function () {

                    var mapping = [
                        {id: '30311', name: 'gol-trend'},
                        {id: '31510', name: 'saveiro'},
                        {id: '30320', name: 'voyage'},
                        {id: '30360', name: 'fox'},
                        {id: '30365', name: 'suran'},
                        {id: '30370', name: 'golf'},
                        {id: '30906', name: 'vento'}
                    ];

                    for (var i = 0; i < mapping.length; i++) {
                        var value = mapping[i];
                        if (window.location.href.indexOf(value.id) > -1)
                            return value.name;
                    }

                    return "unknown";
                };

                var f = false;

                var ae = function (i) {
                    i.addEventListener("click", function () {
                        var model = getCarModel();
                        if (model !== null) {
                            window.versaTagObj.generateRequest("https://www.volkswagen.com.ar/es/modelos/" + model + "/contacto.html");
                        }
                    });
                };

                var d = function () {
                    // only ARG
                    if (window.location.href.indexOf("app-ssl.volkswagen.com.ar") > -1) {
                        if (!f) {
                            var form = document.querySelectorAll("form");
                            if (form.length) {
                                for (var i = 0; i < form.length; i++) {
                                    if (form[i].action.indexOf("forms/dbs/dbs_contact_form_ar.dbs_form.htx") > -1) {
                                        var submitButtons = document.querySelectorAll("[type=submit]");
                                        if (submitButtons.length) {
                                            for (var j = 0; j < submitButtons.length; j++) {
                                                ae(submitButtons[j]);
                                            }
                                            f = true;
                                        }    
                                    }
                                }
                            }
                        }
                    }
                };
                setInterval(d, 500);
            })();

        // PL 
        (function() {
            // only PL
            if (window.location.href.indexOf("app.volkswagen.pl") > -1) {
                var d = function () {
                    var lis = ["customBrochure", "displayMarketingCode"];
                    for (var i = 0; i < lis.length; i++) {
                        var a = document.querySelector('li.' + lis[i] + ' > a');
                        if (a !== null && a.offsetHeight > 0) {
                            if (!a.class) a.class = "";
                            if (a.class.indexOf("cl") === -1) {
                                a.addEventListener("click", function () {
                                    if (a.class.indexOf("do") === -1) {
                                        window.versaTagObj.generateRequest("http://app.volkswagen.pl/getthecode.htm");
                                        a.class += " do";
                                    }
                                });
                                a.class += " cl";
                            }
                        }
                    }
                }
                setInterval(d, 500);
            }
        })();
    }
)();