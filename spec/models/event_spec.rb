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

require 'spec_helper'

describe Event do
  pending "add some examples to (or delete) #{__FILE__}"
end
