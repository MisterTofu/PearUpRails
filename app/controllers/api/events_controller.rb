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
			render :status=>406, :json=>{ :message=> "The request must be json"}, :callback => params[:callback]
			return
		end
		
		activity = params[:activity]
		description = params[:description]
		max_attend = params[:max]
		start_time = params[:start]
		end_time = params[:end]
		location = params[:location]
		#Ensure time are in right format
		
		@user = User.find_by_authentication_token(params[:auth_token])	
		if start_time > end_time
			render :json => {:message => "Cannot start before it ends"}, :callback => params[:callback]
			return
		end
		# we found user 
		if @user.nil?
			render :json => {:message => "Token not found"}, :callback => params[:callback]
			return
		end
	
		# TO DO:	Check if user is busy
		# 			Check for duplicates, based on date & host_id
	# 	UserEvent.find_all @user.i
	
	# write out on paper !
	
		@userevent = UserEvent.where("user_id = ?", @user.id)
		@userevent.each do |x|
			# find each event time the user is linked with
			@event = Event.find x.event_id
			# end_time = 11
			# start_time = 10
			# event.time_end = 10:30
			puts "am I working?"
			puts @event.time_end > start_time and @event.time_end < end_time 

# check time overlap 
			if start_time >= @event.time_start and start_time <= @event.time_end
				puts "not happeneing"
				render :status=>406, :json => {:message => "time overlap", :event => @event}, :callback => params[:callback]
				return 
			end
			puts "avoid"
		end
		
	
		@event = Event.create :activity => activity, :description => description, :max_attend => max_attend, :time_start => start_time, :time_end => end_time, :location => location, :cur_attend => 1, :host_id => @user.email
		# Check Event already exists by user, no duplicates and user not busy
		UserEvent.create :event_id => @event.id, :user_id => @user.id
				
		 render :status=>200, :json=>{:message=> "Successfully added event", :debug => @event}, :callback => params[:callback]
	end
	
	def destroy
	end

end
