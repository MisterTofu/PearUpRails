# == Schema Information
#
# Table name: user_events
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'

describe UserEvent do
  pending "add some examples to (or delete) #{__FILE__}"
end
