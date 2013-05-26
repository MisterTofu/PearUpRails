class Profile < ActiveRecord::Base
  attr_accessible :age, :city, :firstname, :lastname, :phone, :school, :state, :zipcode
  validates_presence_of :age, :city, :firstname, :lastname, :phone, :school, :state, :zipcode
end
