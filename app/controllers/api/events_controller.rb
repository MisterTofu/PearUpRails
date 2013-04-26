class Api::EventsController < ApplicationController
# before_filter :authenticate_user!
respond_to :json


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


def view

end

    
def create
	if request.format != :json
		render :status=>406, :json=>{:message=>"The request must be json"}
		return
	end
	activity = params[:activity]
	description = params[:description]
	max_attend = params[:max]
	date = params[:date]
	start_time = params[:start]
	end_time = params[:end]
	location = params[:location]
	
# 	@api_event

	# Check for duplicates, based on date
	# get host id
	@event = Event.find_or_create_by_activity :activity => activity, :description => description, :max_attend => max_attend, :date => date, :time_start => start_time, :time_end => end_time, :location => location, :cur_attend => 1
	# Check Event already exists by user, no duplicates and user not busy
	
	 render :status=>200, :json=>{:message=> "Successfully added event"}	
end

def destroy
end

end
