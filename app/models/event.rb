# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  activity    :text
#  description :text
#  max_attend  :integer
#  cur_attend  :integer
#  host_id     :integer
#  time_start  :time
#  time_end    :time
#  location    :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ActiveRecord::Base
	attr_accessible :activity, :description, :max_attend, :cur_attend, :host_id, :time_start, :time_end, :location
	validates_presence_of :activity, :description, :max_attend, :cur_attend, :host_id, :time_start, :time_end, :location
end
