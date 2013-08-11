# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) are set in the file config/application.yml.
# See http://railsapps.github.com/rails-environment-variables.html
puts 'ROLES'
YAML.load(ENV['ROLES']).each do |role|
  Role.find_or_create_by_name({ :name => role }, :without_protection => true)
  puts 'role: ' << role
end

puts 'DEFAULT USERS'
user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup, :firstname => "John", :lastname => "Doe", :phone => "808-999-9999", :age => 21, :city => "Honolulu", :state => "HI", :zipcode => 96816, :school => "Chaminade University"

puts 'Creating: ' << user.name
user.add_role :admin

user = User.find_or_create_by_email :name => "Robert", :email => "robjert@gmail.com", :password => "password", :password_confirmation => "password", :firstname => "Robert", :lastname => "Downey Jr.", :phone => "808-999-9999", :age => 21, :city => "Honolulu", :state => "HI", :zipcode => 96816, :school => "Ironman University"

puts 'Creating: ' << user.name

puts 'DEFAULT EVENTS'
#Default events
event = Event.find_or_create_by_activity :activity => "Pearing Up", :description => "Pear Up Discussion", :location => "McDinners", :max_attend => 6, :cur_attend => 1, :host_id => 0, :time_start => "0", :time_end => "0"
puts 'Creating: ' << event.activity
event = Event.find_or_create_by_activity :activity => "Eat", :description => "Pear Up Discussion", :location => "McDinners", :max_attend => 6, :cur_attend => 1, :host_id => 1, :time_start => "0", :time_end => "0"
puts 'Creating: ' << event.activity