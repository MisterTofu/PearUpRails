(function( $ ) {

  var Core = window.Core || Core || {};

  Core.Events = {
    init: function (){
   
	  // Core.Events.bindEvents();
    },
		/*
		 * Loads main page event feed
		 */
    	loadFeed: function(){
	    	Core.sendAuthenticatedRequest("/api/viewevents.json","range_start=0&range_end=5", Core.Events.loadFeedSuccess, Core.Events.loadFeedError, Core.Events.loadFeedDenied);
    	},
    	
    	loadFeedDenied: function(data, textStatus, XMLHttpRequest) {
    		console.log("ERROR: Not authenticated?");
    		//Implement trying to relogging in
    		//Implement Check if server is down
    		
    		Core.Auth.logout();
			window.location = "login.html";
    	
    	},
    	
    	loadFeedSuccess: function(data, textStatus, XMLHttpRequest) {
	    	var template = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#event&id={{id}}" class="ui-link-inherit"><img src="./profile/{{host_id}}.jpg" class="ui-li-thumb"><h2 class="ui-li-heading">{{activity}}</h2><p class="ui-li-desc">{{description}}</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
			var html = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">' + Mustache.to_html(template, data.events[0]);

			
			template = '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#event&id={{id}}" class="ui-link-inherit"><img src="./profile/{{host_id}}.jpg" class="ui-li-thumb"><h2 class="ui-li-heading">{{activity}}</h2><p class="ui-li-desc">{{description}}</p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
			
		    for( x = 1; x < data.events.length; x++)
			    html += Mustache.to_html(template, data.events[x]);
			html += "</ul>"
		    Core.contentReplace.html(html);
		},
								
		loadFeedError: function(data, textStatus, XMLHttpRequest){
			if(data.status == 401)
				Core.Events.loadFeedDenied()
			else
				Core.contentReplace.html('<div style="text-align:center">Unable to Refresh Feed</div>');
				console.log("Event Feed: " + textStatus+ "\nRequest Status: " + XMLHttpRequest);
				console.log(data);
		},
    	
		// parse params in hash
		hashParams: function(hash) {
			  var ret = {};
			  var match;
			  var plus   = /\+/g;
			  var search = /([^\?&=]+)=([^&]*)/g;
			  var decode = function(s) { 
				  return decodeURIComponent(s.replace(plus, " ")); 
			  };
			  while( match = search.exec(hash) ) ret[decode(match[1])] = decode(match[2]);
			  return ret;
		  },
		  
		  
/* 		  Individual Events 		*/
	
		showEvent: function(url, options)
		{
			  var params = Core.Events.hashParams(url.hash);
			  var params = Core.Events.hashParams(Core.getURLHash());
			  var eventId = parseInt( params['id'] );
			  Core.sendAuthenticatedRequest("/api/singleevent.json","id="+eventId, Core.Events.showEventSuccess, Core.Events.showEventError, function(){});
/* 			  Core.sendRequest("/api/singleevent.json", "auth_token=" + Core.authToken + "&id=" + eventId, Core.Events.showEventSuccess, Core.Events.showEventError); */
		},
		  
		showEventSuccess: function(data, textStatus, XMLHttpRequest){
				var template = '<h1 id="profileHeader">{{activity}}</h1><table><tbody><tr><th id="pullleft">When:</th><td>{{time_start}}-{{time_end}}</td></tr><tr><th id="pullleft">Location:</th><td>{{location}}</td></tr><tr><th id="pullleft">Description:</th><td>{{description}}</td></tr><tr><th id="pullleft">Host:</th><td>{{host_id}}look up database for person</td></tr><tr><th id="pullleft">Attendees:</th><td>{{cur_attend}}/{{max_attend}}</td></tr></tbody></table><ul data-role=listview data-inset=true class="eventsList ui-listview ui-listview-inset ui-corner-all ui-shadow"><li data-corners=false data-shadow=false data-iconshadow=true data-wrapperels=div data-icon=arrow-r data-iconpos=right data-theme=c class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class=ui-btn-text><a href="#"class=ui-link-inherit><img src="./img/obama.jpg"class=ui-li-thumb><h2 class=ui-li-heading>Attendee name</h2><p class=ui-li-desc></p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li><li data-corners=false data-shadow=false data-iconshadow=true data-wrapperels=div data-icon=arrow-r data-iconpos=right data-theme=c class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class=ui-btn-text><a href="#"class=ui-link-inherit><img src="./img/obama.jpg"class=ui-li-thumb><h2 class=ui-li-heading>Attendee#2</h2><p class=ui-li-desc></p></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li></ul>';
				
				html = Mustache.to_html(template, data.event);
				Core.contentReplace.html(html);
		  },
		  
		  showEventError: function(data, textStatus, XMLHttpRequest){
				Core.contentReplace.html('<div style="text-align:center">Unable to Refresh Feed</div>');
				console.log("Show Event: " + textStatus+ "\nRequest Status:" + XMLHttpRequest);
			},
		
		bindEvents: function()
		{
			$(document).on("click", "#add_event_button",function() {
				activity = $("#activity").val();
				event_location = $("#location").val();
				time_start = $("#start").val();
				time_end = $("#end").val();
				activity_date = $("#activity_date").val();
				max = $("#max").val();
				description = $("#description").val();
				Core.sendRequest("/api/events.json", "auth_token="+ Core.authToken + "&activity="+activity+"&description="+description+"&max="+max+"&start='"+activity_date+" "+time_start+"'&end='"+activity_date+" "+time_end+"'&location="+event_location, 
				
						function(data, textStatus, XMLHttpRequest) {
							console.log(data);
							console.log("Added an Event");
							//window.location = 'index.html';
							$(".events_page").click();
						},
						function (data, textStatus, XMLHttpRequest) {
							console.log("Add Event: " + textStatus+ "\nRequest Status:" + XMLHttpRequest);
						});
			});
			
			/*
				Changing page for
				
			*/
			$(document).bind( "pagebeforechange", function( e, data ) {
				// only handle changePage() when loading a page by URL.
				if ( typeof data.toPage === "string" ) {
					// Handle URLs that requests to single event
					var url = $.mobile.path.parseUrl(data.toPage), regex = /^#event/;
					if (url.hash.search(regex) !== -1 ) {
						Core.setURLHash(url.hash);
						Core.Events.showEvent(url, data.options);
						// tell changePage() we've handled this 
						e.preventDefault();
					}
				}
			});	
		}

  };
  
  $( Core.Events.init );
  window.Core = Core;

})(jQuery);

