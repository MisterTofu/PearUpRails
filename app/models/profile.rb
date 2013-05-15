class Profile < ActiveRecord::Base
  attr_accessible :age, :city, :firstname, :lastname, :phone, :school, :state, :zipcode
end
