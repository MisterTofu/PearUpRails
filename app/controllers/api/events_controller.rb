# Author: Travis A Ebesu
# Date: 4/26/2013


class Api::EventsController < ApplicationController
before_filter :authenticate_user!
respond_to :json


# Authorization is required prior to access

#  activity    :text
#  description :text
#  max_attend  :integer
#  cur_attend  :integer
#  host_id     :integer
#  date        :date
#  time_start  :time
#  time_end    :time
#  location    :string(255)

# activity=Beach&description="have fun in the sun"&max=2&start_time=0900&end_time=1000&location="Ala moana"


# 	To DO:
# 		Fix User Authentication 
# 		Input filtering 

# Date/Time format: 2000-01-01 01:00:00.
# YEAR:MM:DD HH:MM:SS
def view

end

    
def create
	if request.format != :json
		render :status=>406, :json=>{ :message=> "The request must be json"}
		return
	end
	
	activity = params[:activity]
	description = params[:description]
	max_attend = params[:max]
	date = params[:date]
	start_time = params[:start]
	end_time = params[:end]
	location = params[:location]

	@user = User.find_by_authentication_token(params[:auth_token])	
	
	# we found user?
	if @user.nil?
		render :json => {:message => "Token not found"}
		return
	end
	
	puts start_time
	# TO DO:	Check if user is busy
	# 			Check for duplicates, based on date
	# Figure out how to parse dates/times
	@event = Event.find_or_create_by_activity :activity => activity, :description => description, :max_attend => max_attend, :date => date, :time_start => start_time, :time_end => end_time, :location => location, :cur_attend => 1, :host_id => @user.email
	# Check Event already exists by user, no duplicates and user not busy
	
	 render :status=>200, :json=>{:message=> "Successfully added event", :debug => @event}	
end

def destroy
end

end
