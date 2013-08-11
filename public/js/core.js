(function( $ ) {

  var Core = Core || {};

  Core = {

    init: function (){		
		/*
			Load Variables
		*/
		Core.contentReplace = $(".ui-content");
		Core.url = "http://0.0.0.0:3000";
		Core.checkAuth();
    },

	
    checkAuth: function(){
  	    $("body").hide();
		if(!Core.Auth.isAuthenticated())
		{
			window.location = "login.html";
			console.log("switch to login page");
		}
		else
		{
		    $("body").show();
			Core.authToken = Core.Auth.getToken();
			Core.setURLHash("home");
			Core.Events.bindEvents();
			Core.Events.loadFeed();
		}
    },
    
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);        
    },
	    
    sendRequest: function(url, parameters, successCallBack, errorCallBack){
	  			$.ajax({ 
		  				type: "POST", 
		  				dataType: "jsonp", 
		  				url: Core.url + url, 
		  				contentType: "application/x-www-form-urlencoded", 
		  				cache: false, 
						data: parameters,
					  	success: successCallBack,
						error: errorCallBack	       
					 });
	    
    },
    
    sendAuthenticatedRequest: function(url, parameters, successCallback, errorCallback, deniedCallback) {
		$.ajax({ 
			type: "POST", 
			dataType: "jsonp", 
			url: Core.url + url, 
			contentType: "application/x-www-form-urlencoded", 
			cache: false, 
			data: "auth_token=" + Core.authToken + "&" + parameters,
			success: successCallback,
			error: errorCallback,
			denied: deniedCallback
		});
    },
    
    
    checkConnection: function(){
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);   
    },

	setURLHash: function(hash) {
		window.location.hash = hash; 
	},
	
	getURLHash: function() {
		return window.location.hash;
	},

	checkURLHash: function(hash){
		if(Core.getURLHash() != "#"+hash)
		{
			Core.setURLHash(hash);
			return true;
		}
		return false;
	}

  };

  $( Core.init );

  window.Core = Core;

})(jQuery);

