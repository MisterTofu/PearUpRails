# Filename: TokensController
# Author: Travis A Ebesu (c) 2013
# Description: Simple token authentication responding to json

class Api::TokensController < ApplicationController
respond_to :json
    
    # Login: email, password => json 
    def create
		email = params[:email]
		password = params[:password]
		if request.format != :json
			render :status => 406, :json=>{:message=>"The request must be json"}, :callback => params[:callback]
			return
		end
		
		if email.nil? or password.nil?
			render :status => 400, :json=>{:message=> "Invalid json format"}, :callback => params[:callback]
			return
		end
		
		@user = User.find_by_email(email.downcase)
		
		if @user.nil?
			logger.info("User #{email} failed signin, user cannot be found.")
			render :status => 401, :json=>{:message=>"Invalid email or passoword."}, :callback => params[:callback]
			return
		end
		
		# http://rdoc.info/github/plataformatec/devise/master/Devise/Models/TokenAuthenticatable
		@user.ensure_authentication_token!
		
		if not @user.valid_password?(password)
			render :status => 401, :json=>{:message=>"Invalid email or password."}, :callback => params[:callback]
		else
			render :status => 200, :json=>{:token=> @user.authentication_token}, :callback => params[:callback]
		end
	end
 
 
	# Logout: token => json
	def destroy
		@user=User.find_by_authentication_token(params[:id])
		if @user.nil?
		  render :status=>404, :json => {:message => "Invalid token"}, :callback => params[:callback]
		else
			@user.authentication_token = nil
			@user.save
			render :status=>200, :json=>{:token=>params[:id]}, :callback => params[:callback]
		end
	end
end
