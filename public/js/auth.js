(function( $ ) {

  var Core = window.Core || Core || {};

  Core.Auth = {
    init: function (){
	    Core.Auth.url = "http://0.0.0.0:3000";
    },
	
	login: function(email, password, saveLogin)
	{
	
		if(!Core.Auth.isAuthenticated())
		{
		    $.ajax({
		
		          type: "POST",
		
		          dataType: "jsonp",
		
		          url: Core.Auth.url + "/api/tokens.json",
		
		          data: 'email='+ email + '&password=' + password,
		          contentType: "application/x-www-form-urlencoded",
		
		          success: function(data, textStatus, XMLHttpRequest) {
		            Core.Auth.setToken(data.token);
					if(saveLogin)
						Core.Auth.setSaveLogin("true");
						
					
					Core.Auth.setEmail(email);
					Core.Auth.setPassword(password);
					window.location =  "index.html";
		            return true;
		          },
		
		          error: function(data, textStatus, XMLHttpRequest){
					console.log("Login: " + textStatus+ "\nRequest Status:" + XMLHttpRequest);
					console.log(data);
		            return false;
		            
		          },
		
		          denied: function(data, textStatus, XMLHttpRequest){
	 	            console.log("Login Denied");
					return false;
		          }
		
		        });
	    }
	    else
	    {
		    return true;
	    }
	},
	
	logout: function()
	{
	    localStorage.removeItem("token");
		
		//add logout server side
	},
	
	isAuthenticated: function()
	{
		return Core.Auth.getToken() !== null;	
	},
	
	hasSavedLogin: function()
	{
		return Core.Auth.getPassword() !== null && Core.Auth.getEmail() !== null;	
	},
			
	getEmail: function()
	{
		return localStorage.getItem("email");
	},
	
	setEmail: function(email)
	{
		localStorage.setItem("email",email);
	},
	
	removeEmail: function()
	{
		localStorage.removeItem("email");
	},
	
	getPassword: function()
	{
		return localStorage.getItem("password");
	},
	
	setPassword: function(pw)
	{
		localStorage.setItem("password",pw);
	},
	
	removePassword: function()
	{
		localStorage.removeItem("password");
	},
	
	getToken: function()
	{
		return localStorage.getItem("token");
	},
	
	setToken: function(token)
	{
		localStorage.setItem("token",token);
	},
	
	removeToken: function()
	{
		localStorage.removeItem("token");
	},
	
	saveLogin: function()
	{
		if(localStorage.getItem("save") == "true")
			return true;
		return false;	
	},
	
	setSaveLogin: function(bool)
	{
		localStorage.setItem("save", bool);	
	},
	
	removeSaveLogin: function()
	{
		localStorage.removeItem("save");	
	}

  };
  $( Core.Auth.init );
  window.Core = Core;

})(jQuery);

