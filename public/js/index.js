/*
 *  Travis A. Ebesu (c) 2013
 */



/*
 *	Core - Javascript for the PearUp App 
 */
function Core(url, auth_token)
{
	this.url = url;
	this.auth_token = auth_token;
}

/*
 * Loads main page event feed
 */
Core.prototype.loadFeed = function()
{
	
var template = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#event&id={{id}}" class="ui-link-inherit"><img src="./img/obama.jpg" class="ui-li-thumb"><h2 class="ui-li-heading">{{activity}}</h2><p class="ui-li-desc">{{description}}</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';


			$.ajax({ type: "POST", dataType: "jsonp", url: this.url + "/api/viewevents.json", contentType: "application/x-www-form-urlencoded", cache: false, 
	          data: "auth_token="+this.auth_token+"&range_start=0&range_end=5",success: function(data) {
	          		          console.log("yay");
	          		          
					obj = data;               
					console.log(data);
					var html = '<ul data-role="listview" data-inset="true" class="eventsList ui-listview ui-listview-inset ui-shadow">';
				    for( x = 0; x < data.events.length; x++)
				    {
					    html += Mustache.to_html(template, data.events[x]);
				    }		    
					html += "</ul>"
				    $(".ui-content").html(html);
				}
        });
}


	$(document).bind( "pagebeforechange", function( e, data ) {
		// only handle changePage() when loading a page by URL.
		if ( typeof data.toPage === "string" ) {
			// Handle URLs that requests chapter page
			var url = $.mobile.path.parseUrl( data.toPage ), regex = /^#event/;
			if ( url.hash.search(regex) !== -1 ) {
				showEvent( url, data.options );
				// tell changePage() we've handled this 
				e.preventDefault();
			}
		}
	});
	
	// parse params in hash
	function hashParams(hash) {
		var ret = {};
	    var match;
	    var plus   = /\+/g;
	    var search = /([^\?&=]+)=([^&]*)/g;
	    var decode = function(s) { 
	    	return decodeURIComponent(s.replace(plus, " ")); 
	    };
	    while( match = search.exec(hash) ) ret[decode(match[1])] = decode(match[2]);
	    return ret;
	};
	
	
	
	function showEvent(url, options)
	{
			var params = hashParams(url.hash);
			var eventId = parseInt( params['id'] );
			console.log(eventId);
			var server_url = "http://0.0.0.0:3000";
			$.ajax({ type: "POST", dataType: "jsonp", url: server_url + "/api/singleevent.json", contentType: "application/x-www-form-urlencoded", cache: false, 
	          data: "auth_token="+this.auth_token+"&id="+ eventId,
	          
	          success: function(data) {
	          		       var template = '<h1 id=profileHeader>{{activity}}</h1><table><tbody><tr><th scope=row>When:</th><td>{{time_start}}-{{time_end}}</td><tr><th scope=row>Location:</th><td>{{location}}</td><tr><th scope=row>Description:</th><td>{{description}}</td><tr><th>Host:</th><td>{{host_id}} look up database for person</td><tr><th scope=row>Attendees:</th><td>{{cur_attend}}/{{max_attend}}</td></table><ul data-role=listview data-inset=true class="eventsList ui-listview ui-listview-inset ui-corner-all ui-shadow"><li data-corners=false data-shadow=false data-iconshadow=true data-wrapperels=div data-icon=arrow-r data-iconpos=right data-theme=c class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class=ui-btn-text><a href="#" class=ui-link-inherit><img src="./img/obama.jpg" class=ui-li-thumb><h2 class=ui-li-heading>Attendee name</h2><p class=ui-li-desc></p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li><li data-corners=false data-shadow=false data-iconshadow=true data-wrapperels=div data-icon=arrow-r data-iconpos=right data-theme=c class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class=ui-btn-text><a href="#" class=ui-link-inherit><img src="./img/obama.jpg" class=ui-li-thumb><h2 class=ui-li-heading>Attendee # 2</h2><p class=ui-li-desc></p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li></ul>';
					obj = data;               
					console.log(data);
				    html = Mustache.to_html(template, data.event);

				    $(".ui-content").html(html);
				    
				}
        });
	}




/*
 * Authentication System, Needs work
 */


/*
	Add a time to live token and require it to relogin to obtain new token every so often
*/

Core.prototype.getToken = function(){
	return localStorage.getItem("token");
}

Core.prototype.isAuthenticated = function(){
	if (this.getToken() !== null)
	{
		console.log(this.getToken());
		return true;
	}
	else
		return false;		
}

Core.prototype.logout = function(){
    localStorage.removeItem("token");
	
	//logout server side
}
	



Core.prototype.login = function(email, password)
{

	if(!this.isAuthenticated())
	{
	    $.ajax({
	
	          type: "POST",
	
	          dataType: "jsonp",
	
	          url: "http://0.0.0.0:3000/api/tokens.json",
	
	          cache: false,
	
	          //data: ajax_data,
	          data: 'email='+ email + '&password=' + password,
	          contentType: "application/x-www-form-urlencoded",
	
	          success: function(data) {
	            localStorage.setItem("token", data.token);
	            return true;
	          },
	
	          error: function(data,status){
	            console.log("error");
	          },
	
	          complete: function(data){
	           	console.log("complete");
	          },
	
	          denied: function(data){
 	            console.log("denied");

	          }
	
	        });
    }
    else
    {
	    return true;
    }
    return false;
}


/*
	Add Event Button
	Uses on to bind to present and future elements with this name
*/


$(document).on("click", "#add_event_button",function() {
		activity = $("#activity").val();
			event_location = $("#location").val();
			time_start = $("#start").val();
			time_end = $("#end").val();
			activity_date = $("#activity_date").val();
			max = $("#max").val();
			description = $("#description").val();
			 $.ajax({
		          type: "POST",
		          dataType: "jsonp",
		          url: "http://0.0.0.0:3000/api/events.json",
		          contentType: "application/x-www-form-urlencoded",
		          cache: false,
		          data: "auth_token="+auth_token+"&activity="+activity+"&description="+description+"&max="+max+"&start='"+activity_date.toString()+" "+time_start+"'&end='"+activity_date.toString()+" "+time_end+"'&location="+event_location,
		          success: function(data) 
		          {
		          	  console.log(data);
			          console.log("Added an Event");
			          //window.location = 'index.html';
			          core.loadFeed();
		          },
				error: function (data) {
					console.log("ERROR");
}
	        });
});


/*
	Add Events Form Validations
*/
	
$("#event_form").validate(
{
			rules:{
				activity:{
					required: true
				},
				location:{
					required: true
				},
				start:{
					required: true
				},
				end:{
					required: true
				},
				activity_date:{
					required: true
				},
				description:{
					required: true
				}
			},
			messages:{
				activity: "Please enter an activity name",
				location: "Please enter a location",
				start: "Please enter a event starting time",
				end: "Please enter a event ending time",
				activity_date: "Please enter the event date",
				description: "Please enter a description"
			}
			
		}
);


	    
var isMobile = 
			{
			  Android: function() {
				  return navigator.userAgent.match(/Android/i);
			  },
			  BlackBerry: function() {
				  return navigator.userAgent.match(/BlackBerry/i);
			  },
			  iOS: function() {
				  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			  },
			  Opera: function() {
				  return navigator.userAgent.match(/Opera Mini/i);
			  },
			  Windows: function() {
				  return navigator.userAgent.match(/IEMobile/i);
			  },
			  any: function() {
				  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			  }
 };
 
 
 
 
  
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    }
};

function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}

var server_url = "http://0.0.0.0:3000";